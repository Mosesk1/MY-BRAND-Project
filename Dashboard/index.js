var title,summary,subject,file;

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
                                                <button id="editBtn" onClick="sayHi();" class="BtnEdit p-btn"><a href=""><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `
                })
            }
            /*document.getElementById('editBtn').addEventListener('click', ()=>{
                document.querySelector('.modal').style.display = 'block';
            });*/
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
        const logoutBtn = document.querySelector('#logout-btn');
        logoutBtn.addEventListener('click', e => {
          e.preventDefault();
          auth.signOut();
          console.log('User signed out!');
          window.location.replace('../index.html');
        })


        var editmodal = document.querySelector('.modal1');
        function editBlog(id,title,summary,subject,link){
            editmodal.style.display = "block";
            //alert(id);
            document.getElementById("edit-blog").addEventListener("submit",(e)=>{
                e.preventDefault();
            });
            
            document.querySelector('.blog__id').value=id;
            document.querySelector('.blog__title').value=title;
            document.querySelector('.blog__summary').value=summary;
            document.querySelector('.blog__content').value=subject;
            //document.getElementById("file1").files[0]=link;


        }
        
        function sayHi(){
            document.querySelector('.modal1').style.display = "block";
        }
       
        
