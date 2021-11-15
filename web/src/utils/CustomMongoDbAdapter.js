import { ObjectId } from "mongodb";

const collections = {
  User: "users",
  UserProfile: "userProfiles",
  Account: "accounts",
  Session: "sessions",
  VerificationToken: "verificationTokens",
};

const format = {
  /** Takes a mongoDB object and returns a plain old JavaScript object */
  from(object) {
    const newObject = {};
    for (const key in object) {
      const value = object[key];
      if (key === "_id") {
        newObject.id = value.toHexString();
      } else if (key === "userId") {
        newObject[key] = value.toHexString();
      } else {
        newObject[key] = value;
      }
    }
    return newObject;
  },
  /** Takes a plain old JavaScript object and turns it into a mongoDB object */
  to(object) {
    const newObject = {
      _id: _id(object.id),
    };
    for (const key in object) {
      const value = object[key];
      if (key === "userId") {
        newObject[key] = _id(value);
      } else {
        newObject[key] = value;
      }
    }
    return newObject;
  },
};

/** Converts from string to ObjectId */
const _id = (hex) => {
  if ((hex === null || hex === void 0 ? void 0 : hex.length) !== 24)
    return new ObjectId();
  return new ObjectId(hex);
};

const CustomMongoDbAdapter = (options) => {
  const { db: m } = options;
  const { from, to } = format;
  const { User, Account, Session, VerificationToken, UserProfile } = {
    User: m.collection(collections.User),
    UserProfile: m.collection(collections.UserProfile),
    Account: m.collection(collections.Account),
    Session: m.collection(collections.Session),
    VerificationToken: m.collection(collections.VerificationToken),
  };
  return {
    // Create user profile during user creation
    async createUser(data) {
      const { email, emailVerified, ...profileProps } = data;
      // Create user
      const user = to({ email, emailVerified });
      await User.insertOne(user);
      // Create user profile & associate to user
      const profile = to(profileProps);
      await UserProfile.insertOne({ userId: user._id, ...profile });
      return from(user);
    },
    async getUser(id) {
      const user = await User.findOne({ _id: _id(id) });
      if (!user) return null;
      return from(user);
    },
    async getUserByEmail(email) {
      const user = await User.findOne({ email });
      if (!user) return null;
      return from(user);
    },
    // Required method to be added
    async getUserByAccount(provider_providerAccountId) {
      const account = await Account.findOne(provider_providerAccountId);
      if (!account) return null;
      const user = await User.findOne({ _id: account.userId });
      if (!user) return null;
      return from(user);
    },
    async linkAccount(data) {
      const account = to(data);
      await Account.insertOne(account);
      return account;
    },
    async createSession(data) {
      console.log("data", data);
      const session = to(data);
      await Session.insertOne(session);
      return from(session);
    },
    async getSessionAndUser(sessionToken) {
      const session = await Session.findOne({ sessionToken });
      if (!session) return null;
      const user = await User.findOne({
        _id: session.userId,
      });
      if (!user) return null;
      const { id, userId, ...profile } = await UserProfile.findOne({
        userId: session.userId,
      });
      const { password, ...userProps } = user;
      const hasPassword = password ? true : false;
      return {
        user: {
          ...from(profile),
          ...from(userProps),
          hasPassword,
        },
        session: from(session),
      };
    },
    async updateSession(data) {
      const { value: session } = await Session.updateOne(
        { sessionToken: data.sessionToken },
        { $set: data }
      );
      return from(session);
    },
    async deleteSession(sessionToken) {
      const { value: session } = await Session.deleteOne({
        sessionToken,
      });
      return from(session);
    },
    async updateUser(data) {
      const { value: user } = await User.updateOne(
        { _id: _id(data.id) },
        { $set: data }
      );
      return from(user);
    },
    // Optional methods
    async deleteUser(id) {
      const userId = _id(id);
      await Promise.all([
        m.collection(collections.Account).deleteMany({ userId }),
        m.collection(collections.Session).deleteMany({ userId }),
        m.collection(collections.UserProfile).deleteOne({ userId }),
        m.collection(collections.User).deleteOne({ _id: userId }),
      ]);
    },
    async unlinkAccount(provider_providerAccountId) {
      const { value: account } = await Account.deleteOne(
        provider_providerAccountId
      );
      return from(account);
    },
    // Required for email provider
    async createVerificationToken(data) {
      // Create tempUser & store code
      await VerificationToken.insertOne(to(data));
      return data;
    },
    async useVerificationToken(identifier_token) {
      // Delete verification entry so it cannot be used again
      const { value: verificationToken } =
        await VerificationToken.findOneAndDelete(identifier_token);
      if (!verificationToken) return null;
      // @ts-expect-error
      delete verificationToken._id;
      return verificationToken;
    },
  };
};

export { CustomMongoDbAdapter };
