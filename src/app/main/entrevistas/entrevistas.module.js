(function ()
{
    'use strict';

    angular
        .module('app.entrevistas', [
            'app.entrevista_fecha',
            'app.asignacion_entrevista'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        

        
    }
})();