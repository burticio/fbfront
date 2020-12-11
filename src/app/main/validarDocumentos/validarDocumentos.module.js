(function ()
{
    'use strict';

    angular
        .module('app.validarDocumentos', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        // State
        $stateProvider.state('app.validarDocumentos', {
            url    : '/validarDocumentos',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/validarDocumentos/validarDocumentos.html',
                    controller : 'ValidarDocumentosController as vm'
                }
            }
        });

       
        // msNavigationServiceProvider.saveItem('apps.validarDocumentos', {
        //     title : 'Chat',
        //     icon  : 'icon-hangouts',
        //     state : 'app.chat',
        //     badge : {
        //         content: 13,
        //         color  : '#09d261'
        //     },
        //     weight: 5
        // });
    }

})();