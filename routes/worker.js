'use strict';

var App = require('../model/App');


module.exports = function (options) {

    return function worker(req, res) {
        App.find(req.params.app_id, function (err, app) {
            var host, enrouten;

            if (err) {
                next(err);
                return;
            }

            if (!app) {
                res.send(404);
                return;
            }

            host = req.protocol + '://' + req.get('host');
            enrouten = req.app.locals.enrouten;

            res.json(app.workers.map(function (worker) {
                return {
                    pid: worker,
                    url: host + enrouten.path('workerById', { app_id: app.id, pid: worker }),
                    usage_url: host + enrouten.path('usageByWorker', { app_id: app.id, pid: worker }),
                    stats_url: host + enrouten.path('statsByWorker', { app_id: app.id, pid: worker }),
                    load_url: host + enrouten.path('loadByWorker', { app_id: app.id, pid: worker })
                };
            }));
        });
    };

};
