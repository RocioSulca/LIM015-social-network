import { userSignUp } from '../main.js';

export const signUpUser = (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  userSignUp(email, password)
    .then(() => {
    // Signed up
    // const user = userCredential.user;
    });
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // // ..
  // });
};
