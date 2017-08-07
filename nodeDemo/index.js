var server = require('./server');
var router = require('./route');
var requestHandler = require('./requestHandler');


/**利用handle对路由进行分流，降低程序间的耦合度 */
var handle = {};
handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['/upload'] = requestHandler.upload;
handle['/show'] = requestHandler.show;

server.start(router.route, handle);