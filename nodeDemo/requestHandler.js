// var exec = require('child_process').exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require('formidable');   //引入外部模块

function start(response) {
    console.log("Request handler 'start' was called.");

    /**延时函数 */
    // function sleep(milliSeconds) {
    //     var startTime = new Date().getTime();
    //     while(new Date().getTime() < startTime + milliSeconds);
    // }
    // sleep(10000);

    // exec('ls-lah', function (error, stdout, stderr) {
    //     response.writeHead(200, { 'Content-Type': 'text/plain' });
    //     response.write('hello start');
    //     response.end();
    // });

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, { 'Content-Type': 'text/html' });   //text/html用于指定响应类型为html
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function (error, fields, files) {
        console.log('parsing done');
        fs.renameSync(files.upload.path, "C:/Users/Yang/AppData/Local/Temp/test");
    })
     response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();

    /*response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write("You've sent: " +
        querystring.parse(postData).text);     //用于仅接受text的输入字段，而不是整个响应字段。
    response.end();*/        //文本显示
}

function show(response, request) {
    console.log("Request handler 'show' was called.");
    fs.readFile("C:/Users/Yang/AppData/Local/Temp/test", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/jpg" });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;