(function ()
{
    'use strict';

    angular
        .module('app.catalogos.areaPrograma', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_areaPrograma', {
            url      : '/catalogos/areaPrograma',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/areaPrograma/catalogos.areaPrograma.html',
                    controller : 'AreaProgramaController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogos/areaPrograma');

        // Navigation



        /*
                msNavigationServiceProvider.saveItem('pages.auth.login', {
                    title : 'Login',
                    state : 'app.pages_auth_login',
                    weight: 1
                });*/
    }

})();