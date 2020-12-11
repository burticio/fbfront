(function ()
{
    'use strict';

    angular
        .module('app.reporteemas', ['datatables', 'ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.reporteemas', {
            url: '/reportes-estudiamas',
            views: {
                'content@app': {
                    templateUrl: 'app/main/reportes/emas/emas.html',
                    controller: 'EmasController as vm'
                }
            },
            bodyClass: 'emas'
        });
    }

})();