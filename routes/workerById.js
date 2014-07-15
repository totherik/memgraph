'use strict';

var Worker = require('../model/Worker');


module.exports = function (options) {

    return function workerById(req, res, next) {
        var type;

        type = req.query.type;

        Worker.find(parseInt(req.params.pid, 10), function (err, worker) {
            var host, enrouten, urlmodel;

            if (err) {
                next(err);
                return;
            }

            if (!worker) {
                res.send(404);
                return;
            }

            host = req.protocol + '://' + req.get('host');
            enrouten = req.app.locals.enrouten;
            urlmodel = {
                app_id: req.params.app_id,
                pid: worker.pid
            };

            res.json({
                pid: worker.pid,
                usage_url: host + enrouten.path('usageByWorker', urlmodel),
                stats_url: host + enrouten.path('statsByWorker', urlmodel),
                load_url: host + enrouten.path('loadByWorker', urlmodel)
            });
        });
    };

};
