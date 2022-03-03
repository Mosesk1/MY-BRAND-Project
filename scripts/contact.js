document.addEventListener('DOMContentLoaded',()=>{
    // validate email
    function validateEmail(email){
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!validRegex.test(email)){
            return false;
        } else {
            return true;
        }};
    // check if value is all letter
    function allLetter(myValue){
        let letters = /^[A-Za-z\s]+$/;
        if(!letters.test(myValue)) {
            return false;
        } else{
            return true;
        }
    }
    // check if value is between a given range
    function validateRange(myValue, minLength, maxLength){
        let myValueLength = myValue.length;
        if(myValueLength == 0 || myValueLength < minLength || myValueLength > maxLength){
            return false;
        } else {
            return true;
        }
    }
    // display error on screen
    function showError(errorMessage, elemClass){
        let newDiv = document.createElement("div");
        let message = document.createTextNode(errorMessage);
        newDiv.appendChild(message);
        newDiv.setAttribute('class', 'error');
        let currentDiv = document.querySelector("."+elemClass);
        currentDiv.prepend(newDiv);
        setTimeout(function(){
            newDiv.remove();
          }, 5000);
    }
    // subscribe to the blog
    function subscribe(email){
        if(!validateEmail(email)){
            showError('please insert valid email','footer__form');
        }
        else{
            alert("thanks for your subscription");
        }
    }
    document.querySelector(".footer__form").addEventListener('submit', (event)=>{
        event.preventDefault();
        let email = document.querySelector('.footer__email').value;
        subscribe(email);
    });
    var d = new Date();
    var t = d.getTime();
    var count = t;
    var today = new Date();
    var dat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();    
    document.querySelector('.contact__form').addEventListener('submit', (event)=>{
    event.preventDefault();
    let counter = 0;
    let name = document.querySelector('.contact__name').value;
    let email = document.querySelector('.contact__email').value;
    let subject = document.querySelector('.contact__subject').value;
    let message = document.querySelector('.contact__message').value;
    if(!allLetter(name)){
        showError('name must contain characters only', 'contact--name');
        counter ++;
    }
    if(!validateEmail(email)){
        showError('Please enter correct email', 'contact--email');
        counter ++;
    }
    if(!validateRange(subject, 5, 20)){
        showError('Subject must be between range of 5 to 20 characters', 'contact--subject');
        counter ++;
    }
    if(message.length == 0){
        showError('Please insert your message', 'contact--message');
        counter ++;
    }
    if(counter == 0){
        count+=1;

            firebase.database().ref('Contact/'+count).set({
                id:count,
                name:name,
                email: email,
                subject:subject,
                message: message,
                date: dat,

            });
            resetForm();
            alert('Message send');
    }
})
})

function resetForm(){
    let name = document.querySelector('.contact__name').value = "";
    let email = document.querySelector('.contact__email').value="";
    let subject = document.querySelector('.contact__subject').value="";
    let message = document.querySelector('.contact__message').value="";
}