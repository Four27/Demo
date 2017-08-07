function route(handle, pathname, response, request) {
    console.log('About to route a request for:' + pathname);

    if (typeof handle[pathname] === 'function') {
        // return handle[pathname](response, postData);    文本请求    //不是很明白这里为什么要加()：因为handle[pathname]目前只是代表start或者upload;
        return handle[pathname](response, request);
    } else {
        console.log('No request handler found for ' + pathname);

        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Not found');
        response.end();
    }
}

exports.route = route;