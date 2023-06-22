import showMessage from "../../utils/message/message";

interface ISignup {
  username: string,
  email: string,
  password: string
}

const signup = async (props: ISignup) => {
  return fetch('http://localhost:3001/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...props })
  })
    .then(async response => {
      if (response.status === 201) {
        showMessage('success', 'success')
        return true;
      } else if (response.status === 400) {
        showMessage('error', 'email already exists\nplease try another one');
        return false;
      } else {
        showMessage('error', 'an unexpected error occured')
        throw new Error('Unexpected response status');
      }
    })
    .catch(error => {
      showMessage('error', error);
      return false
    });
};
export { signup };