function readBlog() {
  var blog = firebase.database().ref("Blogs/");
  blog.on("child_added", function (data) {
    var blogValue = data.val();
    var cat = blogValue.title;
    document.querySelector(".container").innerHTML += `
                    <article class="card">
                        <div class="card__image">
                            <img src="${blogValue.link}" alt="">
                        </div>
                        <div class="card__content">
                            <h1 class="card__title">${blogValue.title}</h1>
                            <p class="card__description">${blogValue.summary}</p>
                            <button type="submit" id"readBtn" onclick="readMore(${blogValue.id})" class="card--more">Read More</button>
                        </div>
                    </article>
                `;
  });
}

function readMore(id) {
  document.querySelector(".container").style.display = "none";
  firebase
    .database()
    .ref("Blogs/" + id)
    .on("value", function (snapshot) {
      document.querySelector(".container1").innerHTML += `
        <article class="card">
                        <div class="card__image">
                            <img src="${snapshot.val().link}" alt="">
                        </div>
                        <div class="card__content">
                            <h1 class="card__title">${snapshot.val().title}</h1>
                            <p class="card__description">${
                              snapshot.val().summary
                            }</p>
                            <p class="card__description" style="color:darkslategray">${
                              snapshot.val().subject
                            }</p>
                            <button type="submit" id"readBtn" onclick="Close()" class="card--more">Back</button>
                        </div>
                    </article>
        `;
    });
}
function Close() {
  console.log("nothing");
  document.querySelector(".container").style.display = "block";
  document.querySelector(".container1").style.display = "none";
}
