(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope,localStorageService, msNavigationService, $state)
    {

       /*
            MENÚ SUPERVISOR
        */

        if (localStorageService.get("session_typeId") == 2) {
            //console.log("2");
            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem('ver_orientacionV');            
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_super");
            msNavigationService.deleteItem("inicio_operador_vista");
            msNavigationService.deleteItem("inicio_operador_universidad");
            msNavigationService.deleteItem('apps.docsSol');
            msNavigationService.deleteItem('apps.documentosSolicitanteAsignacion');
            msNavigationService.deleteItem('apps.documentosSolicitanteAsignacion');
            msNavigationService.deleteItem('app.validacionUni');
            //msNavigationService.deleteItem('apps.documentoSolicitante');

            msNavigationService.deleteItem('apps.entrevistas');
            msNavigationService.deleteItem('apps.entrevista_fecha');
        } //else 
        if (localStorageService.get("session_typeId") == 3) {    //MENU CONSEJO
            //console.log("3");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_super");
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_operador_vista");
            msNavigationService.deleteItem("inicio_operador_universidad");
            msNavigationService.deleteItem('apps.catalogos');
            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem('apps.docsSol');
            msNavigationService.deleteItem('apps.documentosSolicitanteAsignacion');
            msNavigationService.deleteItem('apps.reportes');
            msNavigationService.deleteItem("apps.entrevistas");
            msNavigationService.deleteItem('apps.asignacion_entrevista');
            msNavigationService.deleteItem("apps.programascanalizacion");
            msNavigationService.deleteItem('apps.entrevista_fecha');
            msNavigationService.deleteItem('apps.solicitudes');
            msNavigationService.deleteItem('apps.donaciones');
            msNavigationService.deleteItem('apps.validacionUniversidad');
            msNavigationService.deleteItem('apps.reportes');
            msNavigationService.deleteItem('apps.informes');
            msNavigationService.deleteItem('app.validacionUni');

        } //else 
        if (localStorageService.get("session_typeId") == 4) { // MENU OPERADOR
            //console.log("4");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_super");
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_operador_vista");
            msNavigationService.deleteItem("inicio_operador_universidad");
            msNavigationService.deleteItem('apps.catalogos');
            msNavigationService.deleteItem('busquedaPrograma');
            
            msNavigationService.deleteItem('apps.reportes');
            //msNavigationService.deleteItem('apps.informes');
            msNavigationService.deleteItem("apps.entrevistas");
            msNavigationService.deleteItem('apps.asignacion_entrevista');
            msNavigationService.deleteItem("apps.programascanalizacion");
            msNavigationService.deleteItem('apps.validacionUniversidad');
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitanteUni');
            msNavigationService.deleteItem('app.validacionUni');
            
        } //else 
        if (localStorageService.get("session_typeId") == 5) { // MENU SOLICITANTE
            //console.log("5");
            msNavigationService.deleteItem('ver_orientacionV');                    
            msNavigationService.deleteItem("cita_solicitante");
            msNavigationService.deleteItem("entrevista_fecha");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_operador_universidad");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_super");
            msNavigationService.deleteItem("inicio_operador_vista");
            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem('apps');            
            msNavigationService.deleteItem('apps.documentosSolicitanteAsignacion'); 
            msNavigationService.deleteItem('apps.docsSol');
            msNavigationService.deleteItem('apps.crearComite');
            //msNavigationService.deleteItem('crearComite');

            msNavigationService.deleteItem('apps.reportes');
            msNavigationService.deleteItem('apps.informes');
            msNavigationService.deleteItem("apps.entrevistas");
            msNavigationService.deleteItem('apps.entrevista_fecha');
            msNavigationService.deleteItem('apps.asignacion_entrevista');
            msNavigationService.deleteItem("apps.programascanalizacion");
            msNavigationService.deleteItem('apps.solicitudes');
            msNavigationService.deleteItem('apps.donaciones');
            msNavigationService.deleteItem('apps.validacionUniversidad');
            msNavigationService.deleteItem('app.validacionUni');
        } //else 
        if (localStorageService.get("session_typeId") == 6) { //MENU SUPERUSUARIO
           // console.log("6");
            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem('ver_orientacionV');            
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_operador_vista");
            msNavigationService.deleteItem("inicio_operador_universidad");
            msNavigationService.deleteItem('app.validacionUni');
            //msNavigationService.deleteItem('app.documentoSolicitante');
            //msNavigationService.deleteItem('documentosSolicitanteAsignacion');
            //msNavigationService.deleteItem('app.documentosSolicitanteAsignacion');
            //msNavigationService.deleteItem('documentoSolicitante');

            msNavigationService.deleteItem('apps.entrevistas');
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitanteUni');
            //msNavigationService.deleteItem('apps.entrevista_fecha');
        } //else 
        if (localStorageService.get("session_typeId") == 7) { //MENU SUPERVISTA
            //console.log("7");
            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem('ver_orientacionV');            
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_operador_vista");
            msNavigationService.deleteItem("inicio_operador_universidad");
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitanteUni');
            msNavigationService.deleteItem('app.validacionUni');
            //msNavigationService.deleteItem('app.documentoSolicitante');
            //msNavigationService.deleteItem('documentosSolicitanteAsignacion');
            //msNavigationService.deleteItem('app.documentosSolicitanteAsignacion');
            //msNavigationService.deleteItem('documentoSolicitante');

            msNavigationService.deleteItem('apps.entrevistas');
            //msNavigationService.deleteItem('apps.entrevista_fecha');
        }
        if (localStorageService.get("session_typeId") == 8) { //MENU OPERADOR VISTA
            //console.log("7");
            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem('ver_orientacionV');            
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_super");
            msNavigationService.deleteItem("inicio_operador_universidad");
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitanteUni');
            msNavigationService.deleteItem('app.validacionUni');
            //msNavigationService.deleteItem("inicio_operador_vista");
            //msNavigationService.deleteItem('app.documentoSolicitante');
            //msNavigationService.deleteItem('documentosSolicitanteAsignacion');
            //msNavigationService.deleteItem('app.documentosSolicitanteAsignacion');
            //msNavigationService.deleteItem('documentoSolicitante');

            msNavigationService.deleteItem('apps.entrevistas');
            //msNavigationService.deleteItem('apps.entrevista_fecha');
        }
        if (localStorageService.get("session_typeId") == 9) { //MENU OPERADOR UNIVERSIDAD
           //console.log("5");
            msNavigationService.deleteItem('ver_orientacionV');                    
            msNavigationService.deleteItem("cita_solicitante");
            msNavigationService.deleteItem("entrevista_fecha");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_super");
            msNavigationService.deleteItem("inicio_operador_vista");
            msNavigationService.deleteItem('busquedaPrograma');
            //msNavigationService.deleteItem('apps');            
            msNavigationService.deleteItem('apps.documentosSolicitanteAsignacion'); 
            //msNavigationService.deleteItem('apps.docsSol');
            msNavigationService.deleteItem('apps.crearComite');
            //msNavigationService.deleteItem('crearComite');

            msNavigationService.deleteItem('apps.reportes');
            msNavigationService.deleteItem('apps.informes');
            msNavigationService.deleteItem("apps.entrevistas");
            msNavigationService.deleteItem('apps.entrevista_fecha');
            msNavigationService.deleteItem('apps.asignacion_entrevista');
            msNavigationService.deleteItem("apps.programascanalizacion");
            msNavigationService.deleteItem('apps.solicitudes');
            msNavigationService.deleteItem('apps.donaciones');
            msNavigationService.deleteItem('apps.validacionUniversidad');
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitante');
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitanteCompletos');
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitanteIncompletos');
            msNavigationService.deleteItem('apps.docsSol.documentoSolicitanteVacios');
            msNavigationService.deleteItem('apps.catalogos');
        }
        if (localStorageService.get("session_typeId") == null) {
            console.log("NINGUN LOGIN");
            if(location.pathname!='/pages/auth/login'&&location.pathname!='/busquedaPrograma'&&location.pathname!='/solicitud'&&location.pathname!='/solicitudv2'&&location.pathname!='/pages/auth/recover'&&location.pathname!='/pages/auth/forgot-password'){
                location.replace("/pages/auth/login");
            }
            //app.pages.auth.login
        }/*else {
            console.log("else");
            msNavigationService.deleteItem('ver_orientacionV');
            msNavigationService.deleteItem("inicio_solicitante");                    
            msNavigationService.deleteItem("cita_solicitante");
            msNavigationService.deleteItem("entrevista_fecha");
            msNavigationService.deleteItem("inicio_supervisor");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
            msNavigationService.deleteItem("inicio_super");
            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem('apps');            
            msNavigationService.deleteItem('apps.documentosSolicitanteAsignacion'); 
            msNavigationService.deleteItem('apps.documentoSolicitante');
            msNavigationService.deleteItem('apps.crearComite');
            //msNavigationService.deleteItem('crearComite');

            msNavigationService.deleteItem('apps.reportes');
            msNavigationService.deleteItem("apps.entrevistas");
            msNavigationService.deleteItem('apps.entrevista_fecha');
            msNavigationService.deleteItem('apps.asignacion_entrevista');
            msNavigationService.deleteItem("apps.programascanalizacion");
            msNavigationService.deleteItem('apps.solicitudes.solicitudesActivas');
            msNavigationService.deleteItem('apps.validacionUniversidad');

        }*/
        
        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();