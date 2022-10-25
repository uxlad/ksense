'use strict';

//JS Selectors
const userSection =  document.getElementById('user-data');
const postsContainer = document.querySelector('.posts');
let [cellData, postData] = ['', ''];

//Check if data is received
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(userData => {
   //API gives our an array of json data which can now be iterated
   //Create the DOM for user data
   userData.map(data => {
    cellData += `<tr data-userID="${data.id}">
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                </tr>`;
   }); 
   userSection.innerHTML = cellData; //This will populate the data in the table.
});

//Check row is clicked
userSection.addEventListener('click', function(e){
    const userID = e.target.parentNode.dataset.userid;

    fetch('https://jsonplaceholder.typicode.com/posts?userId='+userID)
    .then(response => response.json())
    .then(posts => {
        const heading =  document.querySelector('.post-user');
        fetch('https://jsonplaceholder.typicode.com/users/'+userID)
        .then(response => response.json())
        .then(user =>{
            heading.innerHTML = `<h2>Posts by: ${user.name}</h2>`;
            posts.map(post => {
                postData += `<div class="post">
                                <h2>${post.title}</h2>
                                <p>${post.body}</p>
                            </div>`;
            });
            postsContainer.innerHTML = postData;
            postData = '';
        });
    });
});