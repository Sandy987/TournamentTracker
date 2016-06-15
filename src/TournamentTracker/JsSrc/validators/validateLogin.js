export default function validateLogin(data, props) {
  const errors = {};
  if(!data.playername) {
    errors.playername = 'Required';
  }

  if(!data.email) {
    errors.email = 'Required';
  }
  if(!data.password) {
    errors.password = 'Required';
  }
  return errors;
}