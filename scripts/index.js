var title,summary,subject,file;
var ImgUrl;
var files=[];
var reader = new FileReader();
var d = new Date();
var t = d.getTime();
var counter = t;
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
    file = document.getElementById('file').value="";
}
document.addEventListener('DOMContentLoaded',()=>{
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
    function readBlog() {
        var blog=firebase.database().ref("Blogs/");
        blog.on("child_added",function(data){
            var blogValue=data.val();
            var cat = blogValue.title;
            console.log("hello");
        document.getElementById("row-table").innerHTML+=`
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>${blogValue.title}</td>
                            <td>${blogValue.summary}</td>
                            <td>${blogValue.date}</td>
                            <td>
                                <div class="action">
                                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    <div class="more">
                                        <a href=""><i class="fa fa-trash" aria-hidden="true"></i></a>
                                        <a href=""><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                        <a href=""><span class="action__view">view</span></a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `
        })
    }
    document.querySelector('.add-blog').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'block';
    });
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
           counter+=1;
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
           firebase.database().ref('Blogs/'+counter).set({
                       id:counter,
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
    document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'none';
    });

    function readBlog(){
        var blog=firebase.database().ref("Blogs/");
        blog.on("child_added",function(data){
            var blogValue=data.val();
            var cat = blogValue.title;  
        document.querySelector(".container").innerHTML+=`
                        <article class="card">
                            <div class="card__image">
                                <img src="${blogValue.link}" alt="">
                            </div>
                            <div class="card__content">
                                <h1 class="card__title">${blogValue.title}</h1>
                                <p class="card__description">${blogValue.summary}</p>
                                <a href="more.html" class="card--more">Read More</a>
                            </div>
                        </article>
                    `
        })    
    }



    function searchFunc() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.querySelector('.search');
        filter = input.value;
        table = document.querySelector('.blogs');
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td");
            for(let j = 1; j < td.length -1; j++){
                if(td[j]){
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        break;
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }
    document.querySelector('.search').addEventListener('keyup', ()=>{
        searchFunc();
    });
    readBlog();
})
