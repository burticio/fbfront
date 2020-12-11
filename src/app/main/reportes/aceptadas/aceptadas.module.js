(function ()
{
    'use strict';

    angular
        .module('app.reporteaceptadas', ['datatables', 'ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.reporteaceptadas', {
            url: '/reportes-aceptadas',
            views: {
                'content@app': {
                    templateUrl: 'app/main/reportes/aceptadas/aceptadas.html',
                    controller: 'AceptadasController as vm'
                }
            },
            bodyClass: 'aceptadas'
        });
    }

})();