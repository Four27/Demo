var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request ' + pathname + ' received.');

        route(handle, pathname);

        response.writeHead(200, { 'Content-Type': 'text/plain' });     //定义HTTP头的内容类型（Content-Type）
        response.write('Hello, world');                //定义HTTP相应主体中的内容
        response.end();            //完成响应
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server has started.');
}

exports.start = start;

/**
 * 关于回调函数：
 *  即给某个方法传递了一个函数，这个方法在有事件发生时调用这个函数来进行回调。onRequest即为回调函数
 * 
 * 当服务器访问网页时，服务器会输出两次Request received.因为大部分浏览器都会在你
 * 访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico
 */

/**
 * 关于url
 * http://localhost:8888/start?foo=bar&hello=world 中
 * url.parse(string).pathname: /start
 * url.parse(string).query: foo=bar&hello=world
 */