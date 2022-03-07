
var title,summary,subject,file;
var ImgUrl;
var files=[];
var reader = new FileReader();
var d = new Date();
var t = d.getTime();
var count = t;
var today = new Date();
var dat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        document.addEventListener('DOMContentLoaded',()=>{
            auth.onAuthStateChanged(user => {
                if (user) {
                  console.log(user.email + " is logged in!");
                
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
                                        <div class="action1">
                                                <button type="submit" id="del" onclick="DeleteBlog(${blogValue.id})"><a href=""><i class="fa fa-trash" aria-hidden="true"></i></a></button>
                                                <button class="edit-blog" onClick="editBlog(${blogValue.id},'${blogValue.title}','${blogValue.summary}','${blogValue.subject}','${blogValue.link}')"><i class="fa fa-pencil-square-o" aria-hidden="false"></i></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
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
        } else {
            window.location.replace('../index.html');
          }
        });
        })
        
        
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
        function DeleteBlog(id)
        {
            var blog=firebase.database().ref("Blogs/"+id);
            console.log(blog);
            blog.remove();
            document.getElementById("row-table").innerHTML="";
            location.reload();
            alert('BLog deleted');
        }

        document.getElementById("update").addEventListener("click",(e)=>{
            e.preventDefault();
        });
        function updateBlog(id,title,summary,subject,link){
            
            var id=document.getElementById("eid").value;
            var title=document.getElementById("etitle").value;
            var summary=document.getElementById("esummary").value;
            var subject=document.getElementById("esubject").value;
            var link= "https://firebasestorage.googleapis.com/v0/b/capstone-68204.appspot.com/o/blog%2Fmarvel-superhero-shadow-and-reflection-dcze0xzkpz8ozr49.jpg?alt=media&token=f9c997c3-626a-458d-8a7f-b12dd81f545e";
            //alert(id);
           firebase.database().ref("Blogs/"+id).update({
                id:id,
                title:title,
                summary: summary,
                date: dat,
                subject: subject
           });
           location.reload();
        }

        const logoutBtn = document.querySelector('#logout-btn');
        logoutBtn.addEventListener('click', e => {
          e.preventDefault();
          auth.signOut();
          console.log('User signed out!');
          window.location.replace('../index.html');
        })
        
        function editBlog(id, title, summary, subject, link){

            document.querySelector('.modal1').style.display="block";
        
            document.getElementById("etitle").value=title;
            document.getElementById("esummary").value=summary;
            document.getElementById("esubject").value=subject;
            document.getElementById("eid").value=id;
            document.getElementById("efile").files[0]=link;
        }
        
        
