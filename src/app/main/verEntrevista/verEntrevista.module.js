(function ()
{
    'use strict';

    angular
        .module('app.verEntrevista', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.verEntrevista', {
                url    : '/verEntrevista',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/verEntrevista/verEntrevista.html',
                        controller : 'verEntrevistaController as vm'
                    }
                }
            });

        // Translation
        //$translatePartialLoaderProvider.addPart('app/main/verEntrevista');

        // Api
        //msApiProvider.register('verEntrevista', ['app/data/verEntrevista/verEntrevista.json']);

        // Navigation
      /*  msNavigationServiceProvider.saveItem('fuse', {
            title : 'verEntrevista',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.verEntrevista', {
            title    : 'verEntrevista',
            icon     : 'icon-tile-four',
            state    : 'app.verEntrevista',
            /*stateParams: {
                'param1': 'page'
             },
            translate: 'verEntrevista.verEntrevista_NAV',
            weight   : 1
        });*/
    }
})();