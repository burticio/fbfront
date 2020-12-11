(function ()
{
    'use strict';

    angular
        .module('app.donaciones', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.donaciones', {
                url    : '/donaciones',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/donaciones/donaciones.html',
                        controller : 'donacionesController as vm'
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