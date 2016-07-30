export default function validateLogin(data) {
  const errors = {};
  if (!data.email) {
    errors.email = 'Email Required';
  }
  if (!data.password) {
    errors.password = 'Password Required';
  }
  return Object.keys(errors).length === 0 ? null : errors;
}