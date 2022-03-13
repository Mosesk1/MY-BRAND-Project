document.addEventListener('DOMContentLoaded', ()=>{

    auth.onAuthStateChanged(user => {
        if(user)
        {
            console.log(user.email + " is logged in")
       

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

    function readMessage(){
        
        
        var msg=firebase.database().ref("Contact/");
        msg.on("child_added",function(data){
            var msgValue=data.val();
        document.querySelector('.dash-content').innerHTML+=`
                        <div class="message-cart">
                            <div class="message__header">
                               <div class="name-row">
                                <h4>Name</h4>
                                <span>${msgValue.name}</span>
                               </div> 
                                <div class="date-row">
                                <h4> </h4>
                                <div class="left">
    
                                    <i class="fa fa-calendar" aria-hidden="true"></i><span>${msgValue.date}</span>
                                </div>
                                </div>
                            </div>
                            <div class="message__content">
                            <div class="name-row">
                            <h5>Subject</h5>
                            <p>${msgValue.subject}</p>
                            </div>
                                <button class="message__btn">Read</button>
                            </div>
                        </div>
                    `
                })     
    }

    readMessage();

    document.querySelectorAll('.message__btn').forEach(function(button){
        button.addEventListener('click', ()=>{
            document.querySelector('.modal').style.display = 'block';
        });

    });

    
    document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'none';
    });

    document.querySelector('.blog-form').addEventListener('submit', (event)=>{
        event.preventDefault();

        let content = document.querySelector('.blog__content').value;

        if(content.length == 0){
            showError('Please enter your message', 'blog--content');
        }
    });
}
else {
    window.location.replace('../index.html')
}
})

})

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', e=> {
    e.preventDefault();
    auth.signOut();
    console.log("User signout!");
    window.location.replace('../index.html');
})
