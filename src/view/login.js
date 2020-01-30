import { autEmailPass, sign_socialNewtwork } from '../models/auth.js';
import { btnSignInUp, enabled } from './commonElements.js';

var provider = new firebase.auth.GoogleAuthProvider();

const login = () => {
    const errorSpan = document.getElementById("formError");
    const email = document.getElementById('email_answer').value;
    const password = document.getElementById('password_answer').value;

    if (firebase.auth().currentUser) {
        firebase.auth().signOut();

    } else {

        if (email.length < 4 || "") {
            document.getElementById("email_answer").style.borderColor = "yellow";
            errorSpan.innerHTML = "Your email is incorrect";

            //return;
        } else if (password.length < 4 || "") {
            document.getElementById("password_answer").style.borderColor = "yellow";
            errorSpan.innerHTML = "Your password is incorrect";
            //return;
        } else if (email != "" && password != "") {
            autEmailPass(email, password)

        }
    }

}
const signGoogle = () => {
  console.log("konda")
 firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}
export default () => {
    const welcomeName = document.createElement("h1");
    welcomeName.innerHTML = "WELCOME"
    const inputEmail = document.createElement("INPUT");
    inputEmail.innerHTML = "email";
    inputEmail.setAttribute("placeholder", "Email@gmail.com");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("id", "email_answer");
    inputEmail.setAttribute("class", "inputs form__field ");
    document.body.appendChild(inputEmail);

    const inputPassword = document.createElement("INPUT");
    inputPassword.innerHTML = "password";
    inputPassword.setAttribute("placeholder", "******");
    inputPassword.setAttribute("id", "password_answer");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("required", "");
    inputPassword.setAttribute("class", "inputs form__field ")
    document.body.appendChild(inputPassword);

    const btn = document.createElement("BUTTON");
    btn.innerHTML = "Get Started";
    btn.onclick = login;
    btn.setAttribute('id', 'btn_sign_in');
    btn.setAttribute('class', 'btn')
    //document.body.appendChild(btn);

    //############div con boton entrar con google
    const btngoogle = document.createElement("BUTTON")
    btngoogle.innerHTML = "Sign in whith your Google Account";
    btngoogle.onclick = signGoogle;
    btngoogle.setAttribute('id', 'btn_sign_in_google');
    btngoogle.setAttribute('class', 'btn')
    //div de error
    const diverror = document.createElement("span")
    diverror.setAttribute("id", "formError")
    //btn entrar con google
    const divbtns = document.createElement("div");
    divbtns.setAttribute("class", "btn_sign_in");
    divbtns.appendChild(btngoogle);
    const container = document.createElement("section");
    container.setAttribute("class", "container_grid_login");
     // creamos el formulario
    const formu = document.createElement("div");
    formu.setAttribute('id', 'form-signIn');
    formu.setAttribute("class", "login_container form__group")
    formu.appendChild(welcomeName);
    formu.appendChild(inputEmail);
    formu.appendChild(inputPassword);
    formu.appendChild(diverror)
    formu.appendChild(btn);
    formu.appendChild(divbtns)
    container.appendChild(formu);
    document.body.appendChild(container)

    if(!enabled){
      btnSignInUp();
    }
    btnSignInUp.innerHTML = ""
    return container; //a�adimos el formulario...

};
