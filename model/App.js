'use strict';

var uuid = require('node-uuid');
var levelup = require('levelup');
var db = levelup('./db/app', { valueEncoding: 'json' });


function App() {
    this.id = uuid.v4();
    this.ts = Date.now();
    this.workers = [];
}


App.new = function () {
    return new App();
};


App.find = function (id, cb) {
    db.get(id, function (err, data) {
        var app;

        if (err && err.type !== 'NotFoundError') {
            cb(err);
            return;
        }

        if (!data) {
            cb(null);
            return;
        }

        app = App.new();
        app.id = id;
        app.ts = data.ts;
        app.workers = data.workers || [];
        cb(null, app);
    });
};


App.all = function (cb) {
    var servers, stream;

    function data(data) {
        servers[data.key] = data.value;
    }

    function end() {
        cb(null, servers);
    }

    servers = {};
    stream = db.createReadStream({ valueEncoding: 'json' });
    stream.on('error', cb);
    stream.on('data', data);
    stream.on('end', end);
};


App.prototype.save = function (cb) {
    db.put(this.id, this, cb);
}



module.exports = App;
