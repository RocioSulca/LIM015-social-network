// Este es el punto de entrada de tu aplicacion
import { changeViews } from './views-controllers/router.js';

// const signIn = document.querySelector("#signIn");

// signIn.addEventListener("click", (e) => {
//     e.preventDefault();
//     const username = document.querySelector("#username").value;
//     const password = document.querySelector("#password").value;

//     auth.createUserWithEmailAndPassword(username, password)
//         .then((userCredential) => {
//             // Signed in
//             let user = userCredential.user;
//             console.log(user);
//         })

//     //console.log(username, password);
// });

const init = () => {
  // verificar duda
  changeViews(window.location.hash);
  window.addEventListener('hashchange', () => changeViews(window.location.hash));
};

window.addEventListener('load', init);
