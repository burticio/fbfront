(function ()
{
    'use strict';

    angular
        .module('app.reporteotros', ['datatables', 'ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.reporteotros', {
            url: '/reportes-otrosprogramas',
            views: {
                'content@app': {
                    templateUrl: 'app/main/reportes/otros/otros.html',
                    controller: 'OtrosController as vm'
                }
            },
            bodyClass: 'otros'
        });
    }

})();