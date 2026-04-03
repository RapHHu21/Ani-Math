const button1 = document.getElementById('top_button_1');
const button2 = document.getElementById('top_button_2');
let counter = 0;

function testButton (e){
    counter++;
    console.log(counter);
}

function testButton_clear(e){
    counter = 0;
    console.log('cleared');
    console.log(counter);
}

button1.addEventListener('click', testButton);
button2.addEventListener('click', testButton_clear);