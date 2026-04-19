const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { error } = require('console');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());


app.listen(8888, ()=>{
    console.log('listening');
});

app.get("/elo", (req, res)=>{
    res.send("working");
})

app.get('/',(req, res)=>{
    res.status(200).send("working2");
});

app.get('/testMsg', (req, res)=>{
    console.log("test good");
    res.status(200).send("OK");
});

app.post('/addUser', (req, res)=>{
    const { username, password, email } = req.body;
    fs.readFile("simpleDB.json", "utf8", (err, fileData) => {
        if (err) {
            console.log("read error:", err);
            return res.status(500).json({ error: "read failed" });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(fileData);
        } catch (e) {
            console.log("JSON parse error:", e);
            return res.status(500).json({ error: "invalid JSON" });
        }
        
        const isUserInDB = jsonData.users.find(u=>u.username === username);

        if(isUserInDB){
            return res.status(400).json({error:"User already exists"});
        } else {
            jsonData.users.push({ username, password, email });
        }


        fs.writeFile("simpleDB.json", JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                console.log("write error:", err);
                return res.status(500).json({ error: "write failed" });
            }

            res.json({ message: "added" });
        });
    });
});

app.post('/isUserHere',(req,res)=>{
    const {isUsername} = req.body;
    fs.readFile("simpleDB.json", "utf8", (err, fileData) => {
        if (err) {
            console.log("read error:", err);
            return res.status(500).json({ error: "read failed" });
        }
        let jsonData;
        try {
            jsonData = JSON.parse(fileData);
        } catch (e) {
            console.log("JSON parse error:", e);
            return res.status(500).json({ error: "invalid JSON" });
        }        
        const isUserInDB = jsonData.users.find(u=>u.username === isUsername);
        if(isUserInDB){
            return res.status(400).json({error:"user exists"});
        } else{
            return res.status(200).json({status:"can create username"});
        }
    })
});

app.post('/loginCheck',(req, res)=>{
const {username, password} = req.body;
    fs.readFile("simpleDB.json", "utf8", (err, fileData) => {
        if (err) {
            console.log("read error:", err);
            return res.status(500).json({ error: "read failed" });
        }
        let jsonData;
        try {
            jsonData = JSON.parse(fileData);
        } catch (e) {
            console.log("JSON parse error:", e);
            return res.status(500).json({ error: "invalid JSON" });
        }        
        const isUserInDB = jsonData.users.find(u=>u.username === username);
        if(isUserInDB){
            const isPasswordGood = jsonData.users.find(p=>p.password === password);
            if(isPasswordGood){
                return res.status(200).json({error:"user exists"});
            }else{
                return res.status(400).json({status:"password is wrong"});    
            }
        } else{
            return res.status(400).json({status:"can create username"});
        }
    })
});