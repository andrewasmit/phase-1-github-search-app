// When form is submitted, take the input value and search the GitHub API for users
// After searching the users, display the users on the DOM
// When clicked on a user, send a request to the repos to return data about the repos of that user
// Display their repos on the page.

document.addEventListener('DOMContentLoaded', ()=>{

let form = document.querySelector('#github-form')
const userContainer = document.querySelector('#user-list');
const repoContainer = document.querySelector('#repos-list');
form.addEventListener('submit', formSubmit);

function formSubmit(e){
    e.preventDefault();
    let input = e.target.search.value;
    form.reset();
    searchUser(input);
};

function searchUser(input){
    fetch(`https://api.github.com/search/users?q=${input}`, {
        method: 'GET',
        Accept: 'application/vnd.github.v3+json'
    })
    .then(res=>res.json())
    .then(data=>cardHandler(data))
};

function cardHandler(e){
    for(usr of e.items){
        cardCreator(usr);
    } 
};

function cardCreator(e){
    let li = document.createElement('li');
    li.innerHTML = `
    <h2>${e.login}</h2>
    <img src =${e.avatar_url}>
    <a href =${e.url}>Profile</a>
    `
    let repoBtn= document.createElement('button');
    repoBtn.id = `${e.id}`;
    repoBtn.name = `${e.login}`
    repoBtn.innerText = `${e.login}'s Repos`;
    repoBtn.addEventListener('click', repoFetch);
    li.append(repoBtn);
    userContainer.appendChild(li);
    // console.log(div);
};

function repoFetch(e){
    // let btnId = e.target.id;
    let btnName = e.target.name;
    fetch(`https://api.github.com/users/${btnName}/repos`, {
        method: 'GET',
        Accept: 'application/vnd.github.v3+json'
    })
    .then(res=>res.json())
    .then(data=>repoHandler(data));
};

function repoHandler(e){
    for (git of e){
    repoRender(git.url);
    }
};

function repoRender(e){
    console.log(e);
   let li= document.createElement('li');
   li.innerHTML = `<a href =${e}>Repo<M/a>`;
   repoContainer.appendChild(li);
}


// Just below this are closing tags for the DOMContentLoaded.
})
