let correctAnswer = 0;
const server_address = "http://127.0.0.1:8888";
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
const apiUrl = "https://nekos.best/api/v2/";
const goodReact = ["clap", "smile", "highfive", "thumbsup", "nod"];
const badReact = ["bleh","bored","facepalm","angry", "nope"];


function generateQuestion() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    correctAnswer = a + b;
    document.getElementById('question').innerText = `Solve: ${a} + ${b} = ?`;
}

const userLogin = document.getElementById('username');
const passwordLogin = document.getElementById('password');
async function login() {
    const login_err = document.getElementById('err_login');

    try{
        const isGood = await checkCredentials(userLogin.value, passwordLogin.value);
        //console.log(isGood + " :is good");
    
        if (isGood === 1) {
            const rembChck = document.getElementById('rememberMe');
            if(rembChck.checked){
                console.log('i will remember you next time');
                localStorage.setItem('user', userLogin.value);
                localStorage.setItem('password', passwordLogin.value);
            }	  
          showApp(userLogin.value);
          clearLogin();
        } else {
            login_err.textContent = "Niepoprawne dane przy logowaniu";
            clearLogin();
        }
    } catch (error){
        console.log(error);
        login_err.textContent = "Blad polaczenia";
        setTimeout(()=>{
            login_err.textContent = "";
        }, 5000);
    }
}

function clearLogin(){
    userLogin.value = "";
    passwordLogin.value = "";
}

async function checkCredentials(username, password) {
    const payload = {username, password};
    const creds = await fetch(server_address+'/loginCheck',{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
            'Content-type' : 'application/json'
        }
    });

    if(creds.status === 200){
        return 1;
    } else{
        return 0
    }
}

async function sendRequestTest(){
    return await fetch(server_address+"/testMsg",{
        method: "GET"
    }).then((res)=>res);
}

let username_check = 0;
const username_reg = document.getElementById('username_reg');
const user_err = document.getElementById('err_name');

function validateUsername(){
    user = username_reg.value;
    if(user !== "" && user.length>= 5){
        chcekUsername(user);
    } else {
        userExists();
    }
}

function userExists(){
    user_err.textContent = "Uzytkownik o takiej nazwie istnieje lub wprowadzona zla nazwe";
}

async function chcekUsername(isUsername){
    console.log('user being checked');
    const payload = {isUsername};
    console.log(payload + " :checking username");    
    const isUser = await fetch(server_address+"/isUserHere",{
        method: "POST",
        body: JSON.stringify(payload),
        headers:{
            'Content-type' : 'application/json'
        }
    });

    if(isUser.status === 200){
        user_err.textContent = "";
        username_check = 1;
    } else{
        userExists();
    }
}

let email_check = 0;
const email_reg = document.getElementById('email_reg');
function validateEmail(){
    const email_err = document.getElementById("err_email");      
    if(email_regex.test(email_reg.value)){
        console.log('valid email');
        email_check = 1;    
        email_err.textContent = "";
    }else{
        email_err.textContent = "Niepoprawny email";        
        email_check = 0;
    } 
}

const password_reg =  document.getElementById('password_reg');
function validatePassword(){
    const pass_err = document.getElementById("err_pass");
    if(passwordRegex.test(password_reg.value)){
        console.log("password good");
        pass_err.textContent = "";
    } else{
        pass_err.textContent = "Haslo powinno miec 1 duza litere, 1 cyfre oraz min 6 znakow"
    }
}

let password_check = 0;
const password_reg_check = document.getElementById('password_regConf');
function validateCheckPassword(){
    const passCheck_err = document.getElementById('err_passCheck');
    if(password_reg_check.value === password_reg.value){        
        passCheck_err.textContent = "";
        password_check = 1
    }else{
        passCheck_err.textContent = "Hasla sie nie zgadzaja";
        password_check = 0;
    }
}


function register(){
    
    const sumCheck = 3;
    let sum = email_check + password_check + username_check;
    console.log(sum + " :checksum");
    if(sumCheck === sum){
        showApp(username_reg.value);
        registerUser(username_reg.value, password_reg.value, email_reg.value);
    }
}

async function registerUser(username, password, email){
    const payload = {username, password, email};    
    const res = await fetch(server_address+"/addUser",{
        method: "POST",
        body: JSON.stringify(payload),
        headers:{
            'Content-type' : 'application/json'
        },
    });
    
    if(res.status === 400){
        console.log("res400");
        userExists();
    }
}

let initial_value = 0;
const eyeIcon = document.querySelectorAll('.passwordEye');
const eyeTable = ['assets/icons/eyeClosed.png', 'assets/icons/eyeOpen.png'];
const password = document.getElementById('password');
function changePasswordVis(){
    const button = document.getElementById('showPass');

    if(button.click){
        initial_value = initial_value ^ 1;
        if (initial_value === 1){
            showPassword();
            initial_value = 1;
        }else if (initial_value === 0){
            hidePassword();
            initial_value = 0;
        }
    }
}

function hidePassword(){
    initial_value = 0;
    eyeIcon.forEach(element => {
        element.src = eyeTable[0];                
    });
    password.type = 'password';
    password_reg.type = 'password';
    password_reg_check.type = 'password';
}

function showPassword(){
    initial_value = 1;
    eyeIcon.forEach(element => {
        element.src = eyeTable[1];
    });
    password.type = 'text';
    password_reg.type = 'text';
    password_reg_check.type = 'text';
}

function logOut(){
    hideApp();
}

function hideApp(){
    document.getElementById('loginPanel').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('welcome').innerText = 'Welcome ' + user;
}

function showApp(user) {
    document.getElementById('loginPanel').classList.add('hidden');
    document.getElementById('registerPanel').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('welcome').innerText = 'Welcome ' + user;
    sendRequestTest().then(()=>{
        console.log("connection good");
    });
    generateQuestion();
}

function showRegister() { 
    hidePassword();   
    document.getElementById('loginPanel').classList.add('hidden');
    document.getElementById('registerPanel').classList.remove('hidden');
}

function getResponse(reaction){
    return axios.get(apiUrl + reaction)
        .then(response => response.data.results[0].url);
}

function getCategory(type){
    if(type === "good"){
        const a = Math.floor(Math.random() * 4);
        return goodReact[a];
    }
    if(type === "bad"){
        const a = Math.floor(Math.random() * 4);
        return badReact[a];
    }
}

function checkAnswer() {
    const answer = document.getElementById('answer');
    const img = document.getElementById('resultImg');

    if (Number(answer.value) === correctAnswer) {
        let react = getCategory("good");
        getResponse(react).then(picUrl => {
            img.src= picUrl;
        });
        img.style.display = 'block';
        generateQuestion();
        answer.value = "";
    } else {
        alert('Try again!');
        let react = getCategory("bad");
        getResponse(react).then(picUrl => {
            console.log(picUrl);
            img.src= picUrl;
        });
        answer.value = "";
    }
}

window.onload = () => {
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('submitBtn').addEventListener('click', checkAnswer);
    document.getElementById('logoutBtn').addEventListener('click', logOut);
    const showPasses = document.querySelectorAll('.showPassClass');
    showPasses.forEach(element => {
        element.addEventListener('click', changePasswordVis)
    });
    document.getElementById('registerBtn').addEventListener('click', showRegister);
    document.getElementById('registerMeID').addEventListener('click', (e)=>{
        e.preventDefault();
        //debugger;
        //live server robil reload po wyslaniu...
        register();
    });
    email_reg.addEventListener('input', validateEmail);
    password_reg.addEventListener('input', validatePassword);
    password_reg_check.addEventListener('input', validateCheckPassword);
    username_reg.addEventListener('input', validateUsername);

    const user = localStorage.getItem('user');
	const password = localStorage.getItem('password');

    //localStorage.clear(); --- clear ls if logout

    if (user && password) showApp(user);

//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.register('sw.js');
//     }
// commented cuz cached files breaks my css
};