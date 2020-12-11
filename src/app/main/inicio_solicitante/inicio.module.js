(function ()
{
    'use strict';

    angular
        .module('app.inicio_solicitante', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.inicio_solicitante', {
                url    : '/inicio-solicitante',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/inicio_solicitante/inicio.html',
                        controller : 'InicioSolicitanteController as vm'
                    }
                },
                bodyClass: 'profile'
            });

        // Translation 
        msNavigationServiceProvider.saveItem('inicio_solicitante', {
            title : 'Inicio',
            state : 'app.inicio_solicitante',
            icon: 'icon-home-variant'
        }); 
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