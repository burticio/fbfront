(function ()
{
    'use strict';

    angular
        .module('app.catalogos.calificaciones', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.entrevistas_calificaciones', {
            url      : '/calificacion',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/calificacion/catalogos.calificacion.html',
                    controller : 'CalificacionController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });
 

        // Translation
       // $translatePartialLoaderProvider.addPart('app/main/catalogos/monedas');

        // Navigation



        /*
                msNavigationServiceProvider.saveItem('pages.auth.login', {
                    title : 'Login',
                    state : 'app.pages_auth_login',
                    weight: 1
                });*/
    }

})();