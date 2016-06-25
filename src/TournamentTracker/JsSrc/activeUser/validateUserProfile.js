export default function validateUserProfile(data, props) {
  const errors = {};
  if(!data.email) {
    errors.email = 'Required';
  }
  if(!data.playerName) {
    errors.playerName = 'Required';
  }
  if(!data.userName) {
    errors.userName = 'Required';
  }
  return errors;
}