const express = require('express');
const bcryptjs = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());


app.listen(8888, ()=>{
    console.log('uwu');
});

app.get("/elo", (req, res)=>{
    console.log("uwu2");
    res.send("uwu");
})

app.get('/',(req, res)=>{
    let message = "piwo123";
    let hashMsg = bcryptjs.hashSync(message, 10);
    res.write("siemka");
    console.log(hashMsg + " :hash1");
});

app.get('/testMsg', (req, res)=>{
    console.log("hejka");
    res.status(200).send("OK");
});
