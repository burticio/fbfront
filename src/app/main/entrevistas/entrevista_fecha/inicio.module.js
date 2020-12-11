(function () {
    'use strict'

    angular
        .module('app.entrevista_fecha', [])
        .config(config)

    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, $mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('YYYY-MM-DD');
        };

        $stateProvider.state('app.entrevista_fecha', {
            url: '/entrevistas',
            views: {
                'content@app': {
                    templateUrl: 'app/main/entrevistas/entrevista_fecha/inicio.html',
                    controller: 'EntrevistaFechaController as vm'
                }
            },
            bodyClass: 'entrevistas'
        });
    }
})();
