/**
 *  This method returns an object with two fields, both nullable,
 *  errors and success. Errors returns the field and error message
 *  if field is valid, success boolean returned on success.
 **/

// TODO: Have Karina check english vocab

const validateFields = ({ field, value }) => {
  let regex, isValid, isShort, isLong;

  const empty = value === "" || value === null || typeof value === "undefined";
  const includesAt = value && typeof value === "string" && value.includes("@");

  // Generic error object
  const errorObject = (field, message) => ({
    errors: {
      field,
      message,
    },
    success: false,
  });

  switch (field) {
    /*********************************************************************
     *
     *  Email must be of format:
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
        success: true,
      };

    /*********************************************************************
     *
     *  Username must be of format:
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

      // Can't have an "@" sign
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
        success: true,
      };

    /*********************************************************************
     *
     *  Full name field constraints:
     *  1) is required
     *  2) cannot be less than 3 characters
     *  3) cannot exceed the 50 characters
     *
     ********************************************************************/

    case "fullName":
      // Field required
      if (empty) {
        return errorObject(
          "fullName",
          "What's your full name? This field is required."
        );
      }

      // Must be at least 3 characters
      isShort = value.length < 3;
      if (isShort) {
        return errorObject(
          "fullName",
          "Your name must be at least 3 characters long."
        );
      }

      // Must be at most 50 characters
      isLong = value.length > 20;
      if (isLong) {
        return errorObject(
          "fullName",
          "We don't need all your names. Your first and last is fine."
        );
      }

      return {
        success: true,
      };

    /*********************************************************************
     *
     *  Address field constraints:
     *  1) is required
     *
     ********************************************************************/

    case "address":
      // Field required
      if (empty) {
        return errorObject("address", "Where do you want to find food?");
      }

      return {
        success: true,
      };

    case "picture":
      // Field required
      if (empty) {
        return errorObject("picture", "Please add a profile picture.");
      }

      return {
        success: true,
      };

    /*********************************************************************
     *
     *  Item picture field constraints:
     *  1) is required
     *
     ********************************************************************/

    case "itemPicture":
      // Field required
      if (empty) {
        return errorObject(
          "picture",
          "The picture sells it. Please add add a picture of your plate."
        );
      }

      return {
        success: true,
      };

    /*********************************************************************
     *
     *  Item name field constraints:
     *  1) is required
     *
     ********************************************************************/

    case "itemName":
      // Field required
      if (empty) {
        return errorObject("itemName", "What should we call your plate?");
      }

      return {
        success: true,
      };

    case "price":
      // Field required
      if (empty) {
        return errorObject("price", "Price is required.");
      }

      return {
        success: true,
      };

    /*********************************************************************
     *
     *  Description field constraints:
     *  1) is required
     *
     ********************************************************************/

    case "description":
      // Field required
      if (empty) {
        return errorObject("description", "Please add a short description.");
      }

      return {
        success: true,
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
