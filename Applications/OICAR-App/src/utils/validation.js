export const emailValidator = email => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};

export const isEmptyValidator = text => {
  if (!text || text.length === 0) {
    return false;
  }

  return true;
}
