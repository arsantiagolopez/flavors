/**
 * Validate user inputted name.
 * @param {string} name - name value.
 * @returns an isValid boolean and an error object with
 * a field and message with further instructions on how
 * to bypass any errors.
 */

/**
 * @todo Decide on name validation:
 * 1) Must at least have first and last name.
 */

const validateName = (name) => {
  let isValid = true;
  let message = null;

  const words = name.split(" ");

  // 1) Must at least two names (given and family)
  if (words.length < 2) {
    return {
      isValid: false,
      message: "Please input your full legal name.",
    };
  }

  return { isValid, message };
};

export { validateName };
