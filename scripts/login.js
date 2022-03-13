
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
 e.preventDefault();
 // get user info
 var email =  document.getElementById('email').value;
  var password= document.getElementById('password').value;
 // log the user in
 auth.signInWithEmailAndPassword(email, password).then((cred) => {
   console.log(auth);
   loginForm.reset();
   window.location.replace('Dashboard/index.html');
}).catch(error => {
 alert(error.message);
})
});



// const email = document.getElementById('email').value;
// const password = document.getElementById('password').value;
// const form  = document.getElementById('login-form').value;
    
// document.querySelector('.login__form').addEventListener('submit', (event)=>{
//   event.preventDefault();


//       checkInputs();

//     });

//     function checkInputs(){

//       const emailvalue = email.value;
//       const passwordvalue = password.value;

//       if (emailvalue === '') {
        
//         setErrorFor(email, 'Email cannot be blank')
//       }else{
//         setSuccess(email);
//         // console.log('sucess');
//       }

//     }

//     function setErrorFor(input, message){
//       const loginform= input.parentElement;    // login__content
//       const small = loginform.querySelector('small');

//       small.innerText = message;

//       // loginform.classname = 'login__content login--email'
//     }

//     function setSuccess(input){
//       const loginform = input.parentElement;
//       loginform.classname = 'login__content login--email';
//     }
    
   