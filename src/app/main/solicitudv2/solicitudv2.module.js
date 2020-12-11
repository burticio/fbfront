(function ()
{
    'use strict';

    angular
        .module('app.solicitudv2', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.solicitudv2', {
            url      : '/solicitudv2',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/solicitudv2/solicitudv2.html',
                    controller : 'solicitudv2Controller as vm'
                }
            },
            bodyClass: 'solicitudv2'
        }); 
    }

})();