(function ()
{
    'use strict';

    angular
        .module('app.catalogos.programa', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.catalogos_programa', {
            url      : '/catalogos/programa',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/catalogos/programa/catalogos.programa.html',
                    controller : 'ProgramaController as vm'
                }
            },
            bodyClass: 'programas'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogos/programa');

        // Navigation
 
       
    }

})();