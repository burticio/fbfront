

(function ()
{
    'use strict';

    angular
        .module('app.busquedaPrograma', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.busquedaPrograma', {
            url      : '/busquedaPrograma',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/busquedaPrograma/busquedaPrograma.html',
                    controller : 'BusquedaProgramaController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });
          
        
        msNavigationServiceProvider.saveItem('busquedaPrograma', {
            title : 'Busqueda Programas',
            state : 'app.busquedaPrograma'
        }); 
    }

})();