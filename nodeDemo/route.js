function route(handle, pathname) {
    console.log('About to route a request for:' + pathname);

    if(typeof handle[pathname] === 'function') {
        handle[pathname]();               //不是很明白这里为什么要加();
    } else {
        console.log('No request handler found for ' + pathname);
    }
}

exports.route = route;