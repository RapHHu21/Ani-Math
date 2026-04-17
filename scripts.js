let correctAnswer = 0;
const server_address = "http://127.0.0.1:8888";
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

function generateQuestion() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    correctAnswer = a + b;
    document.getElementById('question').innerText = `Solve: ${a} + ${b} = ?`;
}

function login() {
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (user && password) { //change to function that checks this with node
		console.log(password);
		const rembChck = document.getElementById('rememberMe');
		console.log('step1');
		if(rembChck.checked){
			console.log('i will remember you next time');
			localStorage.setItem('user', user);
			localStorage.setItem('password', password);
		}	  
      showApp(user);
    }
}

async function sendRequestTest(){
    return await fetch(server_address+"/testMsg",{
        method: "GET"
    }).then((res)=>res);
}

let username_check = 0;
const username_reg = document.getElementById('username_reg');
function validateUsername(){
    if(username_reg.value !== ""){
        username_check = 1;
    }
}

let email_check = 0;
const email_reg = document.getElementById('email_reg');
function validateEmail(){
    const email_err = document.getElementById("err_email");      
    if(email_regex.test(email_reg.value)){
        console.log('valid');
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
        console.log("nie cwel");
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
    console.log(sum)

    //do stuff
    if(sumCheck === sum){
        showApp(username_reg.value);
    }
}


let initial_value = 0;
function showPasword(){
    const password = document.getElementById('password');
    const button = document.getElementById('showPass');
    const eyeIcon = document.getElementById('passwordEye');
    const eyeTable = ['assets/icons/eyeClosed.png', 'assets/icons/eyeOpen.png'];

    if(button.click){
        initial_value = initial_value ^ 1;
        if (initial_value === 1){
            eyeIcon.src = eyeTable[initial_value%2];
            password.type = 'text';
        }else if (initial_value === 0){
            eyeIcon.src = eyeTable[initial_value%2];
            password.type = 'password';
        }
    }
}


function showApp(user) {
    document.getElementById('loginPanel').classList.add('hidden');
    document.getElementById('registerPanel').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('welcome').innerText = 'Welcome ' + user;
    sendRequestTest().then(()=>{
        console.log("1");
    });
    generateQuestion();
}

function showRegister() {
    document.getElementById('loginPanel').classList.add('hidden');
    document.getElementById('registerPanel').classList.remove('hidden');
}

function checkAnswer() {
    const answer = document.getElementById('answer');
    const img = document.getElementById('resultImg');

    if (Number(answer.value) === correctAnswer) {
        img.style.display = 'block';
        generateQuestion();
        answer.value = "";
    } else {
        alert('Try again!');
        answer.value = "";
    }
}

// Events
window.onload = () => {
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('submitBtn').addEventListener('click', checkAnswer);
    document.getElementById('showPass').addEventListener('click', showPasword);
    document.getElementById('registerBtn').addEventListener('click', showRegister);
    document.getElementById('registerMeID').addEventListener('click', register);
    email_reg.addEventListener('input', validateEmail);
    password_reg.addEventListener('input', validatePassword);
    password_reg_check.addEventListener('input', validateCheckPassword);
    username_reg.addEventListener('input', validateUsername)
	//document.getElementById('rememberMe').addEventListener('click', rememberCheck);

    const user = localStorage.getItem('user');
	const password = localStorage.getItem('password');

    //localStorage.clear(); --- clear ls if logout

    if (user && password) showApp(user);

//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.register('sw.js');
//     }
// commented cuz cached files breaks my css
};