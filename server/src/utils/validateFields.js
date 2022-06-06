/**
 *  This method returns an object with two fields, both nullable,
 *  errors and isValid. Errors returns the field and error message
 *  if field is valid, isValid returns a boolean if valid or not.
 *  @param {string} field -
 *  @param {string/object} value -
 *  @returns and error
 **/

// TODO: Have Karina check english vocab

const validateFields = ({ field, value }) => {
  let regex, isValid, isShort, isLong;

  const empty = value === "" || value === null || typeof value === "undefined";
  const includesAt = value && typeof value === "string" && value.includes("@");

  // Generic error object
  const errorObject = (field, message) => ({
    error: { field, message },
    isValid: false,
  });

  switch (field) {
    /*********************************************************************
     *
     *  Password validation:
     *  1) is required
     *  2) Must be at least 5 characters long
     *  3) Cannot exceed the 50 character length
     *
     *********************************************************************/

    case "password":
      // Field required
      if (empty) {
        return errorObject("password", "A password is required.");
      }

      // Must be at least 5 characters long
      if (value.length < 5) {
        return errorObject(
          "password",
          "Password must be at least 5 characters long."
        );
      }
      // Hashed passwords roughly double in size
      // Max space set aside in db is 100
      if (value.length > 50) {
        return errorObject("password", "Password too long.");
      }

      return {
        isValid: true,
      };

    /*********************************************************************
     *
     *  Email validation:
     *  1) is required
     *  2) cannot include "@ "sign
     *
     *********************************************************************/

    case "email":
      // Field required
      if (empty) {
        return errorObject("email", "What's a good e-mail address?");
      }

      // Very simple, valid format regex
      regex = /\S+@\S+\.\S+/;
      isValid = regex.test(value);
      if (!isValid) {
        return errorObject("email", "Please try a different e-mail.");
      }

      return {
        isValid: true,
      };

    /*********************************************************************
     *
     *  Username validation:
     *    /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
     *  Explanation:
     *    a) (?=.{3,20}$) = is 3-20 characters long
     *    b) (?![_.]) = cannot start with ".", "_" or "-"
     *    c) (?!.*[_.]{2}) = cannot have consecutive ".", "_", "-" characters
     *    d) [a-zA-Z0-9._-] = allowed characters are alphanumeric, "_", ".", and "-" (no "@")
     *    e) (?<![_.]) = cannot end with "_" or "."
     *
     *********************************************************************/

    case "username":
      // Field required
      if (empty) {
        return errorObject("username", "Please add a username.");
      }

      // Must be at least 3 characters
      isShort = value.length < 3;
      if (isShort) {
        return errorObject(
          "username",
          "Username must be at least 3 characters long."
        );
      }

      // Must be at most 20 characters
      isLong = value.length > 20;
      if (isLong) {
        return errorObject(
          "username",
          "Username's too long. Try less than 20 characters."
        );
      }

      // Can't contain an "@" sign
      if (includesAt) {
        return errorObject("username", `Usernames can't contain the "@" sign.`);
      }

      // Valid format (Last, catches all other errors)
      regex = /^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_.-]+(?<![_.-])$/;
      isValid = regex.test(value);
      if (!isValid) {
        return errorObject("username", "Please try a different username.");
      }

      return {
        isValid: true,
      };

    /*********************************************************************
     *
     *  Name validation:
     *  1) is required
     *  2) cannot be less than 3 characters
     *  3) cannot exceed the 50 characters
     *  4) must at least have first and last name.
     *
     ********************************************************************/

    case "name":
      // Field required
      if (empty) {
        return errorObject(
          "name",
          "What's your full name? This field is required."
        );
      }

      // Must be at least 3 characters
      isShort = value.length < 3;
      if (isShort) {
        return errorObject(
          "name",
          "Your name must be at least 3 characters long."
        );
      }

      // Must be at most 50 characters
      isLong = value.length > 20;
      if (isLong) {
        return errorObject(
          "name",
          "We don't need all your names. Your first and last is fine."
        );
      }

      const words = value.split(" ");

      // Must at least have two names (given and family)
      if (words.length < 2) {
        return errorObject("name", "Please input your full legal name.");
      }

      return {
        isValid: true,
      };

    /*********************************************************************
     *
     *  Address validation:
     *  1) is required
     *
     ********************************************************************/

    case "address":
      // Field required
      if (empty) {
        return errorObject("address", "Where do you want to find food?");
      }

      return {
        isValid: true,
      };

    case "picture":
      // Field required
      if (empty) {
        return errorObject("picture", "Please add a profile picture.");
      }

      return {
        isValid: true,
      };

    /*********************************************************************
     *
     *  Item image validation:
     *  1) is required
     *
     ********************************************************************/

    case "itemImage":
      // Field required
      if (empty) {
        return errorObject(
          "image",
          "The picture sells it. Please add add a picture of your plate."
        );
      }

      return {
        isValid: true,
      };

    /*********************************************************************
     *
     *  Item name validation:
     *  1) is required
     *
     ********************************************************************/

    case "itemName":
      // Field required
      if (empty) {
        return errorObject("itemName", "What should we call your plate?");
      }

      return {
        isValid: true,
      };

    case "price":
      // Field required
      if (empty) {
        return errorObject("price", "Price is required.");
      }

      return {
        isValid: true,
      };

    /*********************************************************************
     *
     *  Description validation:
     *  1) is required
     *
     ********************************************************************/

    case "description":
      // Field required
      if (empty) {
        return errorObject("description", "Please add a short description.");
      }

      return {
        isValid: true,
      };

    // case "address":
    //   // For address to be valid, it must contain fields below
    //   let street_number, route, city, state, postal, country;

    //   const components = value.gmaps.address_components;

    //   // Populate all available fields
    //   components.map((obj) => {
    //     // Street check
    //     if (obj["types"].includes("street_number")) {
    //       street_number = obj["short_name"];
    //     }
    //     if (obj["types"].includes("route")) {
    //       route = obj["short_name"];
    //     }
    //     // City check
    //     if (obj["types"].includes("locality")) {
    //       city = obj["long_name"];
    //     }
    //     // State check
    //     if (obj["types"].includes("administrative_area_level_1")) {
    //       state = obj["short_name"];
    //     }
    //     // Postal check
    //     if (obj["types"].includes("postal_code")) {
    //       postal = obj["long_name"];
    //     }
    //     // Country check
    //     if (obj["types"].includes("country")) {
    //       country = obj["short_name"];
    //     }
    //   });

    //   if (!street_number) {
    //     return {
    //       errors: {
    //         field: "address",
    //         message: "Address too broad. Please add a valid delivery address.",
    //       },
    //       success: false,
    //     };
    //   }

    //   return {
    //     success: true,
    //   },
  }
};

export { validateFields };
