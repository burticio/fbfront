(function ()
{
    'use strict';

    angular
        .module('app.programascanalizacion', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.programascanalizacion', {
            url      : '/programas-canalizacion',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/programascanalizacion/programascanalizacion.html',
                    controller : 'ProgramasCanalizacionController as vm'
                }
            },
            bodyClass: 'programascanalizacion'
        }); 
    }

})();