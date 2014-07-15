'use strict';

var Worker = require('../model/Worker');


module.exports = function (options) {

    function predicate(record) {
        return record.value.type && record.value.type === 'stats';
    }

    return function (req, res, next) {
        Worker.findWithFilter(req.params.pid, predicate, function (err, worker) {
            if (err) {
                next(err);
                return;
            }

            if (!worker) {
                res.send(404);
                return;
            }

            res.json(worker.data);
        });
    };

};
