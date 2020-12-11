(function ()
{
    'use strict';

    angular
        .module('app.reportes', [
            'app.reporteaceptadas',
            'app.reporteemas',
            'app.reporteotros',
            'app.reporteaceptadasgenerales',
            'app.reporterechazadas'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        
        
    }
})();