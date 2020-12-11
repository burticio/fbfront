(function ()
{
    'use strict';

    angular
        .module('app.catalogos.usuarios', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_usuarios', {
            url      : '/catalogos/usuarios',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/usuarios/catalogos.usuarios.html',
                    controller : 'UsuariosController as vm'
                }
            },
            bodyClass: 'catalogos-usuarios'
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