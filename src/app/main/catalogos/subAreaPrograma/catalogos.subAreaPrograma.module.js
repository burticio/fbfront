(function ()
{
    'use strict';

    angular
        .module('app.catalogos.subAreaPrograma', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_subAreaPrograma', {
            url      : '/catalogos/subAreaPrograma',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/subAreaPrograma/catalogos.subAreaPrograma.html',
                    controller : 'subAreaProgramaController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogos/subAreaPrograma');

        // Navigation



        /*
                msNavigationServiceProvider.saveItem('pages.auth.login', {
                    title : 'Login',
                    state : 'app.pages_auth_login',
                    weight: 1
                });*/
    }

})();