(function ()
{
    'use strict';

    angular
        .module('app.documentoSolicitanteIncompletos', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.documentoSolicitanteIncompletos', {
                url    : '/documentosSolicitanteIncompletos',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/documentosSolicitanteIncompletos/documentosSolicitanteIncompletos.html',
                        controller : 'DocumentoSolicitanteIncompletosController as vm'
                    }
                },
                bodyClass: 'profile'
            });

        // Translation 
       
        // Api 

        // Navigation
      /*  msNavigationServiceProvider.saveItem('fuse', {
            title : 'SAMPLE',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.sample', {
            title    : 'Sample',
            icon     : 'icon-tile-four',
            state    : 'app.sample',
            /*stateParams: {
                'param1': 'page'
             },
            translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });*/
    }
})();