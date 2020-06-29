export const emailValidator = email => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};

export const usernameValidator = username => {
  const usernameRegex = /^(?![._-])(?!.*[_.-]{2})[a-zA-Z0-9._-]+[^._-]$/;

  if (!usernameRegex.test(username)) {
    return false;
  }

  return true;
}

export const passwordValidator = password => {
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*[a-zA-z0-9!._-]/;

  if (!passwordRegex.test(password)) {
    return false;
  }

  return true;
}

export const isEmptyValidator = text => {
  if (!text || text.length === 0) {
    return false;
  }

  return true;
};

export const minLengthValidator = (text, lenght) => {
  if (!text || text.length < lenght) {
    return false;
  }

  return true;
};

export const maxLengthValidator = (text, lenght) => {
  if (!text || text.length > lenght) {
    return false;
  }

  return true;
};

export const numberValidator = (text) => {
  return !isNaN(text);
};

export const minNumberValidator = (text, min) => {
  const num = parseFloat(text);
  return num >= min;
};

export const maxNumberValidator = (text, max) => {
  const num = parseFloat(text);
  return num <= max;
};