(function ()
{
    'use strict';

    angular
        .module('app.verComite', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider,msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.verComite', {
            url      : '/verSesion',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/verComite/verComite.html',
                    controller : 'verComiteController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        }); 

        

    }

})();