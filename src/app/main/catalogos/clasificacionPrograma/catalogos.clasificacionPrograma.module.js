(function ()
{
    'use strict';

    angular
        .module('app.catalogos.clasificacionPrograma', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_clasificacionPrograma', {
            url      : '/catalogos/clasificacionPrograma',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/clasificacionPrograma/catalogos.clasificacionPrograma.html',
                    controller : 'ClasificacionProgramaController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogos/usuarios');

        // Navigation



        /*
                msNavigationServiceProvider.saveItem('pages.auth.login', {
                    title : 'Login',
                    state : 'app.pages_auth_login',
                    weight: 1
                });*/
    }

})();