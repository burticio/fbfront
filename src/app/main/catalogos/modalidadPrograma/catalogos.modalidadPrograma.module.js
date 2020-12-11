(function ()
{
    'use strict';

    angular
        .module('app.catalogos.modalidadPrograma', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_modalidadPrograma', {
            url      : '/catalogos/modalidadPrograma',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/modalidadPrograma/catalogos.modalidadPrograma.html',
                    controller : 'ModalidadProgramaController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogos/modalidadPrograma');

        // Navigation



        /*
                msNavigationServiceProvider.saveItem('pages.auth.login', {
                    title : 'Login',
                    state : 'app.pages_auth_login',
                    weight: 1
                });*/
    }

})();