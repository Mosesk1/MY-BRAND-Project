document.addEventListener('DOMContentLoaded', ()=>{
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
    })
})