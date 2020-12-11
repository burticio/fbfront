(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming,msNavigationService,localStorageService)
    {
        var vm = this;
 
        // Data
        vm.themes = fuseTheming.themes;

        //////////
    }
})();