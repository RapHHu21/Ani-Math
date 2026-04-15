const http = require('http');
const express = require('express');
const bcryptjs = require('bcryptjs');

const server = http.createServer((request, resposne)=>{
    let message = "piwo123";
    let hashMsg = bcryptjs.hashSync(message, 10);
    resposne.write("siemka");
    console.log(hashMsg + " :hash1");
    resposne.end();
})

server.listen(8080);