(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.recover', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_recover', {
            url      : '/pages/auth/recover',
            views    : {
                'main@'                                : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_recover': {
                    templateUrl: 'app/main/pages/auth/recover/recover.html',
                    controller : 'RecoverController as vm'
                }
            },
            bodyClass: 'recover'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/recover');

        // Navigation
        /*msNavigationServiceProvider.saveItem('pages.auth.reset-password', {
            title : 'Reset Password',
            state : 'app.pages_auth_reset-password',
            weight: 6
        });*/
    }

})();