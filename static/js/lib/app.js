
require.config({
    baseUrl: 'js',
    paths: {
        d3: 'lib/d3.v3.min',
        react: 'lib/react-0.10.0',
        page: 'lib/page',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
        foundation: '//cdn.foundation5.zurb.com/foundation'
        // 'jquery-private': 'lib/jquery-private'
    },
    // map: {
    //     '*': { jquery: 'jquery-private' },
    //     'jquery-private': { jquery: 'jquery' }
    // },
    shim: {
        foundation: {
            deps: ['jquery']
        }
    }
//    deps: ['lib/react-0.10.0', 'lib/d3.v3.min']
});

require(['foundation', 'Application']);
