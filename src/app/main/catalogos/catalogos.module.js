(function ()
{
    'use strict';

    angular
        .module('app.catalogos', [
            'app.catalogos.usuarios',
            //'app.catalogos.clasificacionPrograma',
            'app.catalogos.monedas',
            'app.catalogos.modalidadPrograma',
            'app.catalogos.areaPrograma',
           // 'app.catalogos.subAreaPrograma',
            'app.catalogos.programa',
            'app.catalogos.universidad',
            'app.catalogos.calificaciones',
            'app.catalogos.criterios',
            'app.catalogos.docPrograma',
            'app.catalogos.convocatorias'
            //  'app.pages.auth.register',
            //'app.pages.auth.forgot-password'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {

       
    }
})();