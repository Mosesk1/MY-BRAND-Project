var title,summary,subject,file;
var ImgUrl;
var files=[];
var reader = new FileReader();
var d = new Date();
var t = d.getTime();
var count = t;

var today = new Date();
var dat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
function readForm (){
    title = document.getElementById("title").value;
    summary = document.getElementById("summary").value;
    subject = document.getElementById("subject").value;
    file = document.getElementById('file').files[0];
    console.log(title,summary,subject);
}
function resetForm (){
    title = document.getElementById("title").value="";
    summary = document.getElementById("summary").value="";
    subject = document.getElementById("subject").value="";
    file = document.getElementById('file').value="submited";
}
document.addEventListener('DOMContentLoaded',()=>{
    auth.onAuthStateChanged(user => {
        if (user) {
          console.log(user.email + " is logged in!");
    function validateRange(myValue, minLength, maxLength){
        let myValueLength = myValue.length;
        if(myValueLength == 0 || myValueLength < minLength || myValueLength > maxLength){
            return false;
        } else {
            return true;
        }
    }
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
    function allLetter(myValue){
        let letters = /^[A-Za-z\s]+$/;
        if(!letters.test(myValue)) {
            return false;
        } else{
            return true;
        }
    }
    
    document.querySelectorAll('.action').forEach(function(action){
        action.addEventListener('mouseover', ()=>{
            action.children[1].style.visibility = 'visible'
        });
        action.addEventListener('mouseout', ()=>{
            action.children[1].style.visibility = 'hidden'
        });
    });
    document.querySelector('.blog--add').addEventListener('submit', (event)=>{
        event.preventDefault();
        let title = document.querySelector('.blog__title').value;
        let summary = document.querySelector('.blog__summary').value;
        let content = document.querySelector('.blog__content').value;
        let counter = 0;
        if(!validateRange(title, 5, 30)){
            showError('Please enter title with character between 5 and 30', 'blog--title');
            counter ++;
        }
        if(!validateRange(summary, 5, 50)){
            showError('Please enter summary with characters between 5 and 50', 'blog--summary');
            counter ++;
        }
        if(content.length == 0){
            showError('Please enter your blog content', 'blog--content');
            counter ++;
        }
        if(counter == 0){
            //console.log(title,summary,subject);
           readForm();
           count+=1;
           let storageRef = firebase.storage().ref('blog');
           let file = document.getElementById('file').files[0];
           let thisRef = storageRef.child(file.name);
           thisRef.put(file).then(res=> {
               console.log('upload success');
               console.log(thisRef);
               //alert("upload success");
           }).catch(e=> {
               console.log('Error'+e);
           })
           storageRef.child(file.name).getDownloadURL().then(url=> {
               console.log(url)
           firebase.database().ref('Blogs/'+count).set({
                       id:count,
                       title:title,
                       summary: summary,
                       link:url,
                       date: dat,
                       subject: subject,
                   });
                   resetForm();
                   alert('BLog added');
               }).catch(e=> {
                   console.log(e)});
        }
    });
} else {
    window.location.replace('../index.html');
  }
});
       
});


