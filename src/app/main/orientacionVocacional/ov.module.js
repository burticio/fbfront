(function ()
{
    'use strict';

    angular
        .module('app.orientacionVocacional', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.orientacionVocacional', {
                url    : '/OrientacionVocacional',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/orientacionVocacional/ov.html',
                        controller : 'OrientacionVocacionalController as vm'
                    }
                },
                bodyClass: 'profile'
            });

        // // Translation 
        // msNavigationServiceProvider.saveItem('orientacionVocacional', {
        //     title : 'Orientación vocacional',
        //     state : 'app.orientacionVocacional',
        //     icon: 'icon-content-paste',
        //     weight: 1
        // }); 
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