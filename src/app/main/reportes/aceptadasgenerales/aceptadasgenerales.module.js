(function ()
{
    'use strict';

    angular
        .module('app.reporteaceptadasgenerales', ['datatables', 'ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.reporteaceptadasgenerales', {
            url: '/reportes-aceptadas-generales',
            views: {
                'content@app': {
                    templateUrl: 'app/main/reportes/aceptadasgenerales/aceptadasgenerales.html',
                    controller: 'AceptadasGeneralesController as vm'
                }
            },
            bodyClass: 'aceptadasgenerales'
        });
    }

})();