const fs = require("fs");
const path = require('path');
var express = require('express');
var app = express();
console.log(path.join(__dirname, './dist'));
app.use(express.static(path.join(__dirname, './dist')));

app.get('/*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})

var server = app.listen(8066, function () {

    var host = server.address().address;

    var port = server.address().port;

    console.log('开启服务', host, port);
})