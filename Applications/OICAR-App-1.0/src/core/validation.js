export const emailValidator = email => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!emailRegex.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) 
  return 'Password cannot be empty.';
  return '';
};

export const repasswordValidator = repassword => {
  if (!repassword || repassword.length <= 0) return 'Re-password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const usernameValidator = username => {
  if (!username || username.length <= 0) return 'Username cannot be empty.';

  return '';
};
