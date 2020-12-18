(function ()
{
    'use strict';

    angular
        .module('app.inicio_operador_universidad', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.inicio_operador_universidad', {
                url    : '/inicio-operador-universidad',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/inicio_operador_universidad/inicio.html',
                        controller : 'InicioOperadorUniversidadController as vm'
                    }
                },
                bodyClass: 'profile'
            });

        // Translation 
        msNavigationServiceProvider.saveItem('inicio_operador_universidad', {
            title : 'Inicio',
            state : 'app.inicio_operador_universidad',
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