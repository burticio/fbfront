

(function ()
{
    'use strict';

    angular
        .module('app.detallePrograma', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.detallePrograma', {
            url      : '/detallePrograma',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/busquedaPrograma/detallePrograma/detallePrograma.html',
                    controller : 'DetalleProgramaController as vm'
                }
            },
            bodyClass: 'forms'
        });
          
        // msNavigationServiceProvider.saveItem('busquedaPrograma', {
        //     title : 'Busqueda Programas',
        //     state : 'app.busquedaPrograma',
        //     weight: 1
        // }); 
    }

})();