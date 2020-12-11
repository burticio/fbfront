(function ()
{
    'use strict';

    angular
        .module('app.catalogos.universidad', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_universidad', {
            url      : '/catalogos/universidad',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/universidad/catalogos.universidad.html',
                    controller : 'UniversidadController as vm'
                }
            },
            bodyClass: 'catalogos-universidad'
        });

        // universidad
        $translatePartialLoaderProvider.addPart('app/main/catalogos/universidad');

        // Navigation



/*
        msNavigationServiceProvider.saveItem('pages.auth.login', {
            title : 'Login',
            state : 'app.pages_auth_login',
            weight: 1
        });*/
    }

})();