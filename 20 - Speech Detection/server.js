const express = require('express');
const app = express();
const path = require('path');

app.listen(3000, () => {
    console.log('ok :D');
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index-START.html'));
})