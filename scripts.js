const button1 = document.getElementById('top_button_1');
const button2 = document.getElementById('top_button_2');
const image = document.getElementById('test_pic_id');

const src_main = "https://nekos.best/api/v2/bleh/e94269d4-aba7-4667-82bc-729bc3662080.gif";
const src_changed = "https://nekos.best/api/v2/neko/30e6465d-6aa6-4191-af0e-c740708985d5.png"
let counter = 0;

image.src = "https://nekos.best/api/v2/bleh/e94269d4-aba7-4667-82bc-729bc3662080.gif";

function testButton (e){
    counter++;
    console.log(counter);
    if (counter === 10){
        image.src = src_changed; 
    }
}

function testButton_clear(e){
    counter = 0;
    console.log('cleared');
    console.log(counter);
}

button1.addEventListener('click', testButton);
button2.addEventListener('click', testButton_clear);