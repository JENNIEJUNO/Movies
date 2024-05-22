let API_KEY = `758085914c59faad7a7183c8a00f9931`
let url = ''
let dataList = ''
let totalResults = 0//총 results
let page = 1 // 현재페이지
let pageSize = 6 //한페이지에 보여 줄 results
let groupSize = 3
let category_button = document.querySelectorAll('#category-menus > button')
let subCategoryButton = document.querySelectorAll("#subBox > button")
let flag = true
let current_moving_count = -1; // left right 버튼
let currentBox = document.querySelector('#current-movie')
let currentList = document.querySelector('#current-list')
let moving = 0
let leftRight = document.querySelectorAll('#current-movie button')


leftRight.forEach(x => x.addEventListener('click', (event) => moving_poster(event.target.id)))
category_button.forEach(x => x.addEventListener('click', (event) => categoryMethod(event.target.textContent)))
subCategoryButton.forEach(x => x.addEventListener('click', (event) => categoryMethod(event.target.textContent)))

let automatic_poster = setInterval(() => {MovingInterval()}, 5000)

window.addEventListener('resize', function(){
    currentList.style.transition = 'none'
    if(document.body.clientWidth > 1000){moving = 30}
    else if(document.body.clientWidth > 500){moving = 70}
    else{moving = 80}
    currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
    if(document.body.clientWidth > 1000){document.querySelector('#subBox').style.left = -50 + 'vw'}
})

const SubCategory = (num) => {
    document.querySelector('#subBox').style.transition = '1s'
    if(num == 1){document.querySelector('#subBox').style.left = 0;}
    else{document.querySelector('#subBox').style.left = -50 + 'vw'}
    setTimeout(()=>{
        document.querySelector('#subBox').style.transition = '0s'
    },1)
}

const keywordMethod = () => {
    page = 1;
    let keyword = document.querySelector('#keyword').value
    document.querySelector("#keyword").value = '';
    document.querySelector("#keyword").placeholder = '키워드를 입력하세요.';
    url = new URL(`https://api.themoviedb.org/3/search/movie?query=${keyword}&language=ko&region=KR&api_key=${API_KEY}`)
    document.querySelectorAll('.movie-text')[1].innerHTML = "\"" + keyword + "\" " + "으로 검색한 결과"
    document.querySelector("#search-box").style.display = 'none';
    setTimeout(() => {
        window.scrollTo({ top: document.querySelector('#category-box').offsetTop, behavior: 'smooth' });
    }, 300);
    
    NoRepeat()
}

const keywordFocus = () => {
    document.querySelector("#keyword").placeholder = '';
}

const SearchBox = (num) => {
    if(num == 1){document.querySelector("#search-box").style.display = 'flex';}
    else{
        document.querySelector("#search-box").style.display = 'none';
        document.querySelector("#keyword").value = '';
        document.querySelector("#keyword").placeholder = '키워드를 입력하세요.'
    }
}

function MovingInterval(){
    currentList.style.transition = '1s' // resize시 transition = '0s' 이 되기 때문에 
    if(document.body.clientWidth > 1000){moving = 30}
    else if(document.body.clientWidth > 500){moving = 70}
    else{moving = 80}
    current_moving_count--;
    currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
    if(current_moving_count === -21){
        currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
        current_moving_count = -1
        setTimeout(()=>{
            currentList.style.transition = 'none'
            currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
        }, 500)
    }
}

const moving_poster = (event) => {
    console.log('event', event)
    if(document.body.clientWidth > 1000){moving = 30}
    else if(document.body.clientWidth > 500){moving = 70}
    else{moving = 80}
    if(!flag) return
    flag = false;
    clearInterval(automatic_poster)
    setTimeout(() => {
        flag = true
        automatic_poster = setInterval(()=>{MovingInterval()}, 5000)
    }, 1000)
    currentList.style.transition = '1s' // resize시 transition = '0s' 이 되기 때문에 
    if(event == 'right'){
        current_moving_count--;
        currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
        if(current_moving_count === -21){
            currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
            current_moving_count = -1
            setTimeout(()=>{
                currentList.style.transition = 'none'
                currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
            }, 1000)
        }
    }else if (event == 'left') {
        current_moving_count++;
        currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
        if(current_moving_count === 0){
            currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
            current_moving_count = -20
            setTimeout(()=>{
                currentList.style.transition = 'none'
                currentList.style.transform = `translateX(${current_moving_count * moving}vw)`
            }, 1000)
        }
    }
}

const categoryMethod = (event) => {
    page = 1;
    let category = 0
    //숫자는 id 값에 따라 장르가 지정 됨
    switch(event){
        case '액션': category = 28; break;
        case '모험': category = 12; break;
        case '애니메이션': category = 16; break;
        case '코미디': category = 35; break;
        case '범죄': category = 80; break;
        case '다큐멘터리': category = 99; break;
        case '드라마': category = 18; break;
        case '가족': category = 10751; break;
        case '판타지': category = 14; break;
        case '역사': category = 36; break;
        case '공포': category = 27; break;
        case '음악': category = 10402; break;
        case '미스터리': category = 9648; break;
        case '로맨스': category = 10749; break;
        case 'SF': category = 878; break;
        case 'TV 영화': category = 10770; break;
        case '스릴러': category = 53; break;
        case '전쟁': category = 10752; break;
        case '서부': category = 37; break;
    }
    url = new URL(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${category}&api_key=${API_KEY}`)
    document.querySelector('#subBox').style.left = -50 + 'vw'
    document.querySelectorAll('.movie-text')[1].innerHTML = "\"" + event + "\" " + "영화"
    window.scrollTo({top: document.querySelector('#category-box').offsetTop, behavior: 'smooth'});
    NoRepeat()
}

const pageMethod = (pageNum) => {
    page = pageNum
    NoRepeat()
}

const paginationMethod = () => {
    let totalPage = Math.ceil(totalResults / pageSize)
    let groupPage = Math.ceil(page / groupSize)
    let lastNum = groupPage * groupSize > totalPage ? totalPage : groupPage * groupSize
    let firstNum = lastNum - (groupSize - 1) < 1 ? 1 : lastNum - (groupSize - 1)
    
    let paginationHTML = ''
    paginationHTML += 
    `<button onclick="pageMethod(${1})" style=${page <= 1 ? 'display:none' : ''}><<</button>
    <button onclick="pageMethod(${page - 1})" style=${page <= 1 ? 'display:none' : ''}><</button>`

    for(let i = firstNum; i <= lastNum; i++){
        paginationHTML += 
        `<button onclick="pageMethod(${i})" style="${page == i ? 'background-color:rgb(168, 7, 7);' : ''}">${i}</button>`

    }

    paginationHTML += 
    `<button onclick="pageMethod(${page + 1})" style=${page >= totalPage ? 'display:none' : ''}>></button>
    <button onclick="pageMethod(${totalPage})" style=${page >= totalPage ? 'display:none' : ''}>>></button>`

    document.querySelector('#pagination').innerHTML = paginationHTML
}

const posterMethod = (poster) => {
    return `https://image.tmdb.org/t/p/w500` + poster
}

//current movies
const CurrentList = async () => {
    let current_url = new URL(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&api_key=${API_KEY}`)
    let currentMovies = ''
    try{
        let current_response = await fetch(current_url)
        console.log('current_response', current_response)
        let current_data = await current_response.json()
        console.log('current_data', current_data)
        let current_dataList = current_data.results
        console.log('current_dataList', current_dataList)
        if(current_response.status === 200){
            currentMovies += 
            `<div class="current-item">
                <img src=${posterMethod(current_dataList[current_dataList.length - 1].poster_path)}>
            </div>`
            current_dataList.map(x => 
                currentMovies += 
                `<div class="current-item">
                    <img src=${posterMethod(x.poster_path)}>
                </div>`
            )
            currentMovies += 
            `<div class="current-item">
                <img src=${posterMethod(current_dataList[0].poster_path)}>
            </div>`

            document.querySelector('#current-list').innerHTML = currentMovies
        }else{
            throw new Error(current_data.message)
        }
    }catch(error){
        console.log('error', error.message)
    }
}

//Best or category movies
const CategoryRender = () => {
    //movie list item
    let CategoryHTML = ''
    let start = (page - 1) * 6
    console.log('start', start)
    for(let i = start; i < (start + 6 <= totalResults ? start + 6 : totalResults); i++){
        CategoryHTML += 
        `<div class="category-item">
            <img src=${posterMethod(dataList[i].poster_path)}>
            <p>${dataList[i].title}</p>
        </div>`
    }
    document.querySelector('#list').innerHTML = CategoryHTML
}

const NoRepeat = async () => {
    try{
        let response = await fetch(url)
        console.log('response', response)
        let data = await response.json()
        console.log('data', data)
        dataList = data.results
        totalResults = dataList.length
        console.log('totalResults', totalResults)
        if(response.status === 200){
            CategoryRender()
            paginationMethod()
        }else{
            throw new Error(data.message)
        }
    }catch(error){
        console.log('error', error.message)
    }
}

const CategoryList = () => {
    url = new URL(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc?&api_key=${API_KEY}`)
    NoRepeat()
}

CategoryList()
CurrentList()
