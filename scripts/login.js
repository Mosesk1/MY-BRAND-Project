const firebaseConfig = {
    apiKey: "AIzaSyBG0L2VFxP9bt1gKvh4eMkyxwxUaspoTuY",
    authDomain: "my-brand-project-7d073.firebaseapp.com",
    projectId: "my-brand-project-7d073",
    storageBucket: "my-brand-project-7d073.appspot.com",
    messagingSenderId: "929217368136",
    appId: "1:929217368136:web:e0e232aa73adecd701487d"
  };
  firebase.initializeApp(firebaseConfig);
  const auth =firebase.auth();
  app_firebase = firebase;
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
    window.location.replace('admin/index.html');
}).catch(error => {
  alert(error.message);
})
});