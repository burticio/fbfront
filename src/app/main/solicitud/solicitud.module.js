(function ()
{
    'use strict';

    angular
        .module('app.solicitud', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.solicitud', {
            url      : '/solicitud',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/solicitud/solicitud.html',
                    controller : 'SolicitudController as vm'
                }
            },
            bodyClass: 'solicitud'
        }); 
    }

})();