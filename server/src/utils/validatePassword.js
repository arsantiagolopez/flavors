/**
 * Validate user inputted password.
 * @param {string} password - password value.
 * @returns an isValid boolean and an error object with
 * a field and message with further instructions on how
 * to bypass any errors.
 */

/**
 * @todo Decide on password validation. Must be
 * somewhat secure.
 */

const validatePassword = (password) => {
  let isValid = true;
  let message = null;

  if (password.length < 5) {
    return {
      isValid: false,
      message: "Password must be at least 5 characters long.",
    };
  }
  // Hashed passwords roughly double in size
  // Max space set aside in db is 100
  if (password.length > 50) {
    return {
      isValid: false,
      message: "Password too long.",
    };
  }

  return { isValid, message };
};

export { validatePassword };

// minLength: [5, "Password must be at least 5 characters long."],
// maxLength: [100, "Password too long."],
