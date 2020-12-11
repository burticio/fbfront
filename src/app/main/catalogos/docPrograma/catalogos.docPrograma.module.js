(function ()
{
    'use strict';

    angular
        .module('app.catalogos.docPrograma', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_docPrograma', {
            url      : '/catalogos/docPrograma',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/docPrograma/catalogos.docPrograma.html',
                    controller : 'DocProgramaController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogos/docPrograma');

        // Navigation
 
        /*
        msNavigationServiceProvider.saveItem('pages.auth.login', {
            title : 'Login',
            state : 'app.pages_auth_login',
            weight: 1
        });*/
    }

})();