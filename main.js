//영화 리스트
//현재 상영 영화
//이미지
//카테고리
//검색
//시간당 이미지 넘기기

// 카테고리 with_genres=${}


let API_KEY = `758085914c59faad7a7183c8a00f9931`
let category_button = document.querySelectorAll('.category > button')
let url = ''
let dataList = ''
let totalResults = 0//총 results
let page = 1 // 현재페이지
let pageSize = 6 //한페이지에 보여 줄 results
let groupSize = 3 // pagination을 몇 개씩 보여 줄 것 인지
let currentPosterList = document.querySelector('#current-poster-list')
let current_button = document.querySelectorAll('.current-poster button')
console.log('current_button', current_button)
let flag = true
let current_moving_button = -1; // left right 버튼
let moving = document.querySelector('.current-poster').clientWidth

current_button.forEach(x => x.addEventListener('click', (event) => moving_poster(event.target.textContent)))
category_button.forEach(x => x.addEventListener('click', (event) => categoryMethod(event.target.textContent)))

let automatic_poster = setInterval(() => {Interval()}, 5000)

window.addEventListener('resize', function(){
    moving = document.querySelector('.current-poster').clientWidth;
    currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
    currentPosterList.style.transition = '0s'
    document.querySelector('.img_poster').style.width = moving + 'px'
})

function Interval(){
    currentPosterList.style.transition = '1s' // resize시 transition = '0s' 이 되기 때문에 
    moving = document.querySelector('.current-poster').clientWidth
    current_moving_button--;
    currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
    if(current_moving_button === -21){
        currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
        current_moving_button = -1
        setTimeout(()=>{
            currentPosterList.style.transition = 'none'
            currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
        }, 500)
    }
}

const moving_poster = (event) => {
    moving = document.querySelector('.current-poster').clientWidth
    if(!flag) return
    flag = false;
    clearInterval(automatic_poster)
    setTimeout(() => {
        flag = true
        automatic_poster = setInterval(()=>{Interval()}, 5000)
    }, 1000)
    currentPosterList.style.transition = '1s' // resize시 transition = '0s' 이 되기 때문에 
    if(event == '>'){
        current_moving_button--;
        currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
        if(current_moving_button === -21){
            currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
            current_moving_button = -1
            setTimeout(()=>{
                currentPosterList.style.transition = 'none'
                currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
            }, 1000)
        }
    }else if (event == '<') {
        current_moving_button++;
        currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
        if(current_moving_button === 0){
            currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
            current_moving_button = -20
            setTimeout(()=>{
                currentPosterList.style.transition = 'none'
                currentPosterList.style.transform = `translateX(${current_moving_button * moving}px)`
            }, 1000)
        }
    }
}

const closeSubBox = () => {
    document.querySelector('.mobile-menu-list').style.width = 0
}

const openSubBox = () => {
    document.querySelector('.mobile-menu-list').style.width = '40vw'
}

const closeSearchBox = () => {
    document.querySelector('.search_box').style.opacity = '0'
    document.querySelector('.search_box').style.zIndex = '-1'
}

const openSearchBox = () => {
    document.querySelector('.search_box').style.opacity = '0.8'
    document.querySelector('.search_box').style.zIndex = '1'
}

const keywordMethod = () => {
    let keyword = document.querySelector('.keyword').value
    console.log('keyword', keyword)
    url = new URL(`https://api.themoviedb.org/3/search/movie?query=${keyword}&language=ko&region=KR&api_key=${API_KEY}`)
    NoRepeat()
}

const categoryMethod = (event) => {
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
    document.querySelector('.genre_text').innerHTML = "\"" + event + "\" " + "영화"
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
    `<li class="page-item" onclick="pageMethod(${1})" style=${page <= 1 ? 'display:none' : ''}>
        <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
    <li class="page-item" onclick="pageMethod(${page - 1})" style=${page <= 1 ? 'display:none' : ''}>
        <a class="page-link"><</a>
    </li>`

    for(let i = firstNum; i <= lastNum; i++){
        paginationHTML += 
        `<li class="page-item ${page == i ? 'active' : ''}"
        onclick="pageMethod(${i})"><a class="page-link">${i}</a>
        </li>`
    }

    paginationHTML += 
    `<li class="page-item" onclick="pageMethod(${page + 1})" style=${page >= totalPage ? 'display:none' : ''}>
        <a class="page-link">></a>
    </li>
    <li class="page-item" onclick="pageMethod(${totalPage})" style=${page >= totalPage ? 'display:none' : ''}>
        <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`
    document.querySelector('.pagination').innerHTML = paginationHTML
}

const posterMethod = (poster) => {
    return `https://image.tmdb.org/t/p/w500` + poster
}

//현재 상영 영화
const current_poster = async () => {
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
            //이제 여기서 현재 영화들이 왼쪽으로 넘어가는 것 처럼 보이게 만들어야 함
            currentMovies += 
            `<img src=${posterMethod(current_dataList[current_dataList.length - 1].poster_path)} class="img_poster">`
            current_dataList.map(x => 
                currentMovies += `<img src=${posterMethod(x.poster_path)} class="img_poster">`
            )
            currentMovies += 
            `<img src=${posterMethod(current_dataList[0].poster_path)} class="img_poster">`
            document.querySelector('#current-poster-list').innerHTML = currentMovies
        }else{
            throw new Error(current_data.message)
        }
    }catch(error){
        console.log('error', error.message)
    }
}

const render = () => {

    //movie list item
    let itemHTML = ''
    let start = (page - 1) * 6
    console.log('start', start)
    for(let i = start; i < (start + 6 <= totalResults ? start + 6 : totalResults); i++){
        itemHTML += 
        `<div class="col-4 item">
            <img src=${posterMethod(dataList[i].poster_path)}>
            <p style="color:white">${dataList[i].title}</p>
        </div>`
    }
    document.querySelector('#movie-item').innerHTML = itemHTML
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
            render()
            paginationMethod()
        }else{
            throw new Error(data.message)
        }
    }catch(error){
        console.log('error', error.message)
    }
}

const MovieList = () => {
    //url = new URL(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`)
    url = new URL(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc?&api_key=${API_KEY}`)
    NoRepeat()
}

MovieList()
current_poster()
