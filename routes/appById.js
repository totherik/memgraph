'use strict';

var App = require('../model/App');


module.exports = function (options) {

    return function appById(req, res, next) {
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

            res.json({

                id: app.id,

                start_ts: app.ts,

                url: host + enrouten.path('appById', { app_id: app.id }),

                workers_url: host + enrouten.path('worker', { app_id: app.id }),

            });
        });
    };

};
