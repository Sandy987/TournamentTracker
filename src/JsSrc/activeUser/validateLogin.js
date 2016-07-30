export default function validateLogin(data) {
  const errors = {};
  if (!data.email) {
    errors.email = 'Required';
  }
  if (!data.password) {
    errors.password = 'Required';
  }
  return errors;
}