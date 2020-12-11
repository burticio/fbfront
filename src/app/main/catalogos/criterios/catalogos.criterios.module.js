(function ()
{
    'use strict';

    angular
        .module('app.catalogos.criterios', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.entrevistas_criterios', {
            url      : '/criterios',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/criterios/catalogos.criterios.html',
                    controller : 'CriteriosController as vm'
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