'use strict';

var os = require('os');
var http = require('http');
var express = require('express');
var cluster = require('cluster');
var memwatch = require('memwatch');
var enrouten = require('express-enrouten');
var routes = require('./routes');
var App = require('./model/App');
var Worker = require('./model/Worker');



var then, handler;

then = process.hrtime();

function handle(app) {
    return function (msg) {
        Worker.find(msg.pid, function (err, worker) {
            worker = worker || Worker.new(msg.pid);

            if (app.workers.indexOf(worker.pid) === -1) {
                app.workers.push(worker.pid);
                app.save(function (err) {
                    err && console.error('App', err);
                });
            }

            worker.addData(msg);
            worker.save(function (err) {
                err && console.error('Worker', err);
            });
        });
    };
}

function ts(start) {
    var now = process.hrtime(start);
    return (now[0] * 1000000) + now[1];
}


if (cluster.isMaster) {
    var model, app, server;

    model = App.new();
    model.workers.push(process.pid);
    model.save();

    app = express();
    app.use(express.static('./dist'));
    app.use('/api', enrouten({ index: './routes' }));

    server = http.createServer(app);
    server.listen(8080, function () {
        console.log('Server listening on port %d', server.address().port);
    });

    handler = handle(model);
    process.on('message', handler);
    if (Array.isArray(cluster.workers)) {
        cluster.workers.forEach(function (worker) {
            worker.on('message', handler);
        });
    }
}



(function usage() {
    var record;
    record = {
        id: ts(then),
        pid: process.pid,
        ts: String(new Date()),
        type: 'usage',
        data: process.memoryUsage()
    };
    (handler || process.send)(record);
    setTimeout(usage, 30000).unref();
})();


(function load() {
    var record;
    record = {
        id: ts(then),
        pid: process.pid,
        ts: String(new Date()),
        type: 'load',
        data: os.loadavg()
    };
    (handler || process.send)(record);
    setTimeout(load, 60000).unref();
})();


memwatch.on('stats', function (stats) {
    var record;
    record = {
        id: ts(then),
        pid: process.pid,
        ts: String(new Date()),
        type: 'stats',
        data: stats
    };
    (handler || process.send)(record);
});
