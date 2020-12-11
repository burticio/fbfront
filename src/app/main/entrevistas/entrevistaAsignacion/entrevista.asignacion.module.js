(function ()
{
    'use strict';

    angular
        .module('app.asignacion_entrevista', ['datatables', 'ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.asignacion_entrevista', {
            url: '/admin-entrevistas',
            views: {
                'content@app': {
                    templateUrl: 'app/main/entrevistas/entrevistaAsignacion/entrevista.asignacion.html',
                    controller: 'AsignacionController as vm'
                }
            },
            bodyClass: 'asignacion'
        });
    }

})();