(function ()
{
    'use strict';

    angular
        .module('app.crearComite', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider,msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.crearComite', {
            url      : '/creacionComite',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/crearComite/crearComite.html',
                    controller : 'CrearComiteController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        }); 

       

    }

})();