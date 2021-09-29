setTimeout(() => {
    const swiper = new Swiper('#slideCards', {
        loop: true,
        effect: 'cards',
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
        },
    })
}, 3000)


const cardInstagram = async () => {
    const followers = 253
    const following = 212

    const followersNumEl = document.querySelector('.card-instagram .followers .num')
    const followingNumEl = document.querySelector('.card-instagram .following .num')
    followersNumEl.textContent = followers
    followingNumEl.textContent = following

    console.log(document.querySelector('.FollowerCountText').innerText)
}
cardInstagram()


const cardGitHub = async user => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const followersData = await fetch(`https://api.github.com/users/${user}/followers`)
    const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
    
    // update cache
    if(userData.ok && followersData.ok && reposData.ok) {
        const cardGitHub = { followers, following } = await userData.json()

        const arrFollowersData = await followersData.json()
        cardGitHub.arrFollowers = arrFollowersData
            .sort(() => Math.random() > 0.5)
            .slice(0, 10)

        const arrReposData = await reposData.json()
        cardGitHub.arrRepos = arrReposData
            .filter(e => e.description)
            .sort((a, b) => a.updated_at > b.updated_at? -1:1)
            .slice(0, 10)

        localStorage.cardGitHub = JSON.stringify(cardGitHub)
    }

    if(localStorage.cardGitHub) {
        const {followers, following, arrFollowers, arrRepos} = JSON.parse(localStorage.cardGitHub)

        const followersNumEl = document.querySelector('.card-github .followers .num')
        const followingNumEl = document.querySelector('.card-github .following .num')
        followersNumEl.textContent = followers
        followingNumEl.textContent = following

        const avatarsEl = document.querySelector('.card-github .avatars')
        arrFollowers.forEach(({avatar_url, login}) =>
            avatarsEl.insertAdjacentHTML('beforeend', `<img src="${avatar_url}" alt="${login}">`))
            
        const feedEl = document.querySelector('.card-github .feed')
        arrRepos.forEach(({stargazers_count, updated_at, name, description, html_url}) => {
            const dateBR = updated_at.replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1')
            feedEl.insertAdjacentHTML('beforeend', `
                <a class="repository" href="${html_url}" target="_blank">
                    <h3 class="title">${name}</h3>
                    <p class="description">${description}</p>                       
                    <div class="updated_at">${dateBR}</div>
                    <div>
                        <i class="far fa-star"></i>
                        <span>${stargazers_count}</span>
                    </div>
                </a>
            `)
        })
        console.log({followers, following, arrFollowers, arrRepos})
    }
}
cardGitHub('samuelCupertino')