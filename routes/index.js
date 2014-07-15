'use strict';

var api = [
    {
        name: 'api',
        method: 'GET',
        path: '/',
        handler: function (options) {
            return function (req, res) {
                res.json(api.map(function (endpoint) {
                    return {
                        method: endpoint.method,
                        path: endpoint.path
                    }
                }));
            };
        }
    },
    {
        name: 'app',
        method: 'GET',
        path: '/app',
        handler: require('./app')
    },
    {
        name: 'appById',
        method: 'GET',
        path: '/app/:app_id',
        handler: require('./appById')
    },
    {
        name: 'worker',
        method: 'GET',
        path: '/app/:app_id/workers',
        handler: require('./worker')
    },
    {
        name: 'workerById',
        method: 'GET',
        path: '/app/:app_id/workers/:pid',
        handler: require('./workerById')
    },
    {
        name: 'usageByWorker',
        method: 'GET',
        path: '/app/:app_id/workers/:pid/usage',
        handler: require('./usageByWorker')
    },
    {
        name: 'statsByWorker',
        method: 'GET',
        path: '/app/:app_id/workers/:pid/stats',
        handler: require('./statsByWorker')
    },
    {
        name: 'loadByWorker',
        method: 'GET',
        path: '/app/:app_id/workers/:pid/load',
        handler: require('./loadByWorker')
    }
];


module.exports = function (router) {

    api.forEach(function (def) {
        var named;
        named = router(def);
        named[def.method.toLowerCase()](def.handler({}));
    });

};
