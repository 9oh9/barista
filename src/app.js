import angular from 'angular';
import { MainCtrl } from 'src/components/controllers'
import { InventoryService, ApiService, MenuItemService, MenuService } from 'src/components/services'


angular.module('barista', [])
    .config([
    '$locationProvider',
    ($locationProvider) => {


        $locationProvider.html5Mode({
            enabled: true,
            rewriteLinks: false
        });

        $locationProvider.hashPrefix('!');


    }])
    .service('ApiService', ApiService)
    .service('InventoryService', InventoryService)
    .service('MenuItemService', MenuItemService)
    .service('MenuService', MenuService)
    .controller('MainCtrl', MainCtrl);
