let correctAnswer = 0;

document.getElementById('err_msg_id').textContent = "cwel";

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

function register(){
    //do stuff
    showApp();
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