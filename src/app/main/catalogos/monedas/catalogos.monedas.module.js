(function ()
{
    'use strict';

    angular
        .module('app.catalogos.monedas', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_monedas', {
            url      : '/catalogos/monedas',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/monedas/catalogos.monedas.html',
                    controller : 'MonedasController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogos/monedas');

        // Navigation



        /*
                msNavigationServiceProvider.saveItem('pages.auth.login', {
                    title : 'Login',
                    state : 'app.pages_auth_login',
                    weight: 1
                });*/
    }

})();