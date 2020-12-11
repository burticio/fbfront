(function ()
{
    'use strict';

    angular
        .module('app.reporterechazadas', ['datatables', 'ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.reporterechazadas', {
            url: '/reportes-rechazadas',
            views: {
                'content@app': {
                    templateUrl: 'app/main/reportes/rechazadas/rechazadas.html',
                    controller: 'RechazadasController as vm'
                }
            },
            bodyClass: 'rechazadas'
        });
    }

})();