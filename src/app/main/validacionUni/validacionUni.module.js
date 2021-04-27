

(function ()
{
    'use strict';

    angular
        .module('app.validacionUni', ['datatables','ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.validacionUni', {
            url      : '/validacionUni',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/validacionUni/validacionUni.html',
                    controller : 'validacionUniController as vm'
                }
            }/*,
            bodyClass: 'clasificacionPrograma'*/
        });
          
        
        msNavigationServiceProvider.saveItem('validacionUni', {
            title : 'validacion Uniersidad',
            state : 'app.validacionUni'
        }); 
    }

})();