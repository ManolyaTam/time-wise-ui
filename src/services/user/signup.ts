import showMessage from "../../utils/message/message";

interface ISignup {
  email: string;
  password: string;
}

const signup = async (props: ISignup) => {
  console.log(props);

  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),    
  })
    .then(async (response) => {
      console.log("reessss", response.status);
      if (response.status === 201) {
        showMessage("success", "success");
        return true;
      } else if (response.status === 400) {
        showMessage("error", "email already exists\nplease try another one");
        return false;
      } else {
        showMessage("error", "an unexpected error occured");
        throw new Error("Unexpected response status");
      }
    })
    .catch((error) => {
      showMessage("error", error);
      return false;
    });
};
export { signup };
