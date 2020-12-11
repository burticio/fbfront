(function ()
{
    'use strict';

    angular
        .module('app.catalogos.convocatorias', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_convocatorias', {
            url      : '/catalogos/convocatorias',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/convocatorias/catalogos.convocatorias.html',
                    controller : 'ConvocatoriasController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });
 
    }

})();