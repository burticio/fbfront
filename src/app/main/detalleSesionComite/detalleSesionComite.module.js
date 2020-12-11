(function ()
{
    'use strict';

    angular
        .module('app.detalleComite', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.detalleComite', {
                url    : '/detalle-comite',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/detalleSesionComite/detalleSesionComite.html',
                        controller : 'DetalleComiteController as vm'
                    }
                },
                bodyClass: 'profile'
            });

        // // Translation 
        // msNavigationServiceProvider.saveItem('detalleComite', {
        //     title : 'Inicio',
        //     state : 'app.inicio_comite',
        //     icon: 'icon-home-variant',
        //     weight: 1
        // }); 
        // // Api 

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