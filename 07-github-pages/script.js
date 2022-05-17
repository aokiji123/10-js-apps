const APIURL = "https://api.github.com/users/"

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getUser('aokiji123')

async function getUser(username) {
    const res = await fetch(APIURL + username)
    const resData = await res.json()

    createUserCard(resData)
    getRepos(username)
} 

async function getRepos(username) {
    const res = await fetch(APIURL + username + '/repos')
    const resData = await res.json()

    addReposToCard(resData)
}

function createUserCard(user) {

    const cardHTML = `
        <div class="card">
            <div>
                <img class="card__avatar" src="${user.avatar_url} alt="${user.name}">
            </div>
            <div class="card__info">
                <h2 class="card__name">${user.name}</h2>
                <p class="card__bio">${user.bio}</p>

                <ul class="card__list">
                    <li>
                        ${user.followers}
                        <strong class="card__strong">Followers</strong>
                    </li>
                    <li>
                        ${user.following}
                        <strong class="card__strong">Following</strong>
                    </li>
                    <li>
                        ${user.public_repos}
                        <strong class="card__strong">Repos</strong>
                    </li>
                </ul>

                <h4>Repos:</h4>
                <div id="repos">

                </div>
            </div>
        </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos")

    repos.slice(0, 15).forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')

        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)

        search.value = ""
    }
})