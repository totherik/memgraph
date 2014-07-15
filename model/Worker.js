'use strict';

var levelup = require('levelup');


var dbs = {}
function getDb(name) {
    return dbs[name] || (dbs[name] = levelup('./db/' + name, { valueEncoding: 'json' }));
}


function Worker(pid) {
    this.pid = pid;
    this.data = [];
    this.delta = [];
    this.db = getDb(pid);
    Object.defineProperty(this, 'db', { enumerable: false });
}


Worker.new = function (pid) {
    return new Worker(pid);
};


Worker.find = function (pid, cb) {
    return Worker.findWithFilter(pid, function () { return true; }, cb);
};


Worker.findWithFilter = function (pid, predicate, cb) {
    var worker, stream;

    function data(data) {
        if (predicate(data)) {
            worker.data.push(data.value);
        }
    }

    function end() {
        worker.data.sort(function (a, b) {
            return b.id - a.id;
        });

        cb(null, worker);
    }

    worker = new Worker(pid);
    stream = worker.db.createReadStream({ reverse: true, limit: 50 });
    stream.on('error', cb);
    stream.on('data', data);
    stream.on('end', end);
};



Worker.prototype.addData = function addData(record) {
    var index, worker;

    // Find the record if it exists
    this.data.some(function (current, idx) {
        if (record.id === current.id) {
            index = idx;
            return true;
        }
    });

    // Remove the old one
    if (index !== undefined) {
        this.data.splice(index, 1);
    }

    // Add new record
    this.data.push(record);
    this.data.sort(function (a, b) {
        return b.id - a.id;
    });

    this.delta.push(record);
};


Worker.prototype.save = function (cb) {
    var ops, records, db;

    records = this.delta.slice();
    this.delta = [];

    ops = records.map(function (record) {
        return {
            type: 'put',
            key: record.id,
            value: record
        };
    });

    this.db.batch(ops, cb);
};



module.exports = Worker;
