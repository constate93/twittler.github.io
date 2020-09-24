// your code here


// DATA는 이미 작성된 트윗을 표시합니다.
console.log(DATA)

// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
console.log(generateNewTweet());

// document.getElementById('test').innerHTML = 'hello twittler, check developer console!';

const comment = document.querySelector('#comment');
const newtweet = document.querySelector('#newtweet');
const tweetbtn = document.querySelector('#tweet');
const nameValue = document.querySelector('#namebox');
const commentValue = document.querySelector('#commentbox');
const refresh = document.querySelector('#refresh');
let name = document.querySelectorAll('.name');
let liEl = document.querySelectorAll('li');


function inint(){ // DATA에 있는 값을 addList해준다
    for(let i = 0; i < DATA.length; i++){
        addList(DATA[i].user, DATA[i].created_at, DATA[i].message);
    }
    clickName();
}

function lastComment(){
    // 마지막 글입니다 작성
    const lastLi = document.createElement('li');
    const lastDiv = document.createElement('div');
    const iElement =document.createElement('i');

    lastLi.className = 'lastLi';
    lastDiv.className = 'content';
    lastDiv.id = 'lastContent';
    iElement.className = 'fab fa-twitter';
    iElement.id = 'lastBird';

    lastDiv.textContent = '마지막 글입니다';
    iElement.textContent = '만든사람 : 김성현,이준희';

    lastLi.append(lastDiv, iElement);
    comment.prepend(lastLi);
    //
}

function addList(user, time, msg){ // li를 생성해서 화면에 띄우기까지
    const liElement = document.createElement('li');
    const viewDivElement = document.createElement('div');
    const contentDivElement = document.createElement('div');
    const nameSpanElement = document.createElement('span');
    const dateSpanElement = document.createElement('span');

    liElement.classList.add("listitem");
    viewDivElement.classList.add("view");
    contentDivElement.classList.add("content");
    // nameSpanElement.classList.add("name");
    nameSpanElement.className = 'name';
    dateSpanElement.classList.add("date");

    nameSpanElement.textContent = user;
    dateSpanElement.textContent = time;
    contentDivElement.textContent = msg;

    viewDivElement.append(nameSpanElement, dateSpanElement);
    // viewDivElement.append(dateSpanElement);
    liElement.append(viewDivElement, contentDivElement);
    // liElement.append(contentDivElement);
    comment.prepend(liElement);
    comment.addEventListener('click', clickName());
}

newtweet.addEventListener('click', function(){ // 랜덤 생성된 트윗 객체를 DATA에 push 하고 addList한다.
    DATA.push(generateNewTweet());
    addList(DATA[DATA.length -1].user, DATA[DATA.length -1].created_at, DATA[DATA.length -1].message);
    comment.scrollTo(0,0);
});

tweetbtn.addEventListener('click', function(){ // user 입력값을 DATA에 push, addList실행.
    if(nameValue.value === ''){
        alert('사용자 이름을 입력하세요')
    }else if(commentValue.value === ''){
        alert('내용을 입력하세요')
    }else{
        let userData = {};
        userData['user'] = nameValue.value;
        userData['message'] = commentValue.value;
        userData['created_at'] = new Date().format();
        nameValue.value = '';
        commentValue.value = '';
        DATA.push(userData);
        addList(DATA[DATA.length -1].user, DATA[DATA.length -1].created_at, DATA[DATA.length -1].message);
        comment.scrollTo(0,0);
    }
});


refresh.style.display = "none";


function clickName(){
    name = document.querySelectorAll('.name');
    liEl = document.querySelectorAll('li');
    for(let i = 0; i < name.length; i++){
        name[i].addEventListener('click', function(event){
            for(let j = 0; j < liEl.length; j++){
                if(event.target.textContent !== liEl[j].querySelector('.name').textContent){
                    liEl[j].remove();
                    newtweet.style.display = "none";
                    refresh.style.display = "block";
                    comment.scrollTo(0,0);
                }
            }
        });
    }
}

refresh.addEventListener('click', function(){
    // for(let i = 0; i < comment.hasChildNodes().length; i++){
    //     comment.removeChild(comment.firstChild);
    // }

    while(comment.childElementCount > 1){
        comment.removeChild(comment.firstChild);
    }
    // while(comment.hasChildNodes()){
    //     comment.removeChild(comment.firstChild);
    // }
    newtweet.style.display = "block";
    refresh.style.display = "none";
    inint();
    comment.scrollTo(0,0);
})



inint();

// 처음에 DATA에 있는 5개의 트윗이 나와야한다.
// check new tweet 클릭시 랜덤한 트윗이 작성되어 ul에 추가. DATA에 저장.
// user가 입력한 값으로 tweet버튼 클릭시 값의 내용이 ul에 추가. DATA에 저장.
// username을 클릭하면 클릭된 username의 값이 li가 가지고 있는 내의 user 값과
// 같은 것만 출력한다.
