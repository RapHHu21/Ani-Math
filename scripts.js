let correctAnswer = 0;

function generateQuestion() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    correctAnswer = a + b;
    document.getElementById('question').innerText = `Solve: ${a} + ${b} = ?`;
}

function login() {
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (user && password) {
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


function showApp(user) {
    document.getElementById('loginPanel').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('welcome').innerText = 'Welcome ' + user;
    generateQuestion();
}

function checkAnswer() {
    const answer = document.getElementById('answer').value;
    const img = document.getElementById('resultImg');

    if (Number(answer) === correctAnswer) {
      img.style.display = 'block';
      generateQuestion();
    } else {
      alert('Try again!');
    }
}

// Events
window.onload = () => {
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('submitBtn').addEventListener('click', checkAnswer);
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