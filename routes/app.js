'use strict';

var App = require('../model/App');


module.exports = function (options) {

    return function app(req, res, next) {
        App.all(function (err, apps) {
            var host, enrouten, model;

            if (err) {
                next(err);
                return;
            };


            if (!apps) {
                res.send(404);
                return;
            }

            host = req.protocol + '://' + req.get('host');
            enrouten = res.app.locals.enrouten;

            model = Object.keys(apps).map(function (id) {
                var app;

                app = apps[id];

                return {

                    id: app.id,

                    start_ts: app.ts,

                    url: host + enrouten.path('appById', { app_id: app.id }),

                    workers_url: host + enrouten.path('worker', { app_id: app.id }),

                    workers: app.workers.map(function (worker) {
                        return {
                            pid: worker,
                            url: host + enrouten.path('workerById', { app_id: app.id, pid: worker })
                        };
                    })

                };
            });

            model.sort(function (a, b) {
                return b.start_ts - a.start_ts;
            });

            res.json(model);
        });
    };

};
