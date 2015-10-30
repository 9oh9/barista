class MainCtrl {

    constructor($scope, ApiService, InventoryService, MenuItemService, MenuService){
        this.$scope = $scope;
        this.api = ApiService;
        this.inventoryService = InventoryService;
        this.menuItemService = MenuItemService;
        this.menuService = MenuService;
        this.directions = true;
        this.drink = null;

        // do some data bootstapping for app;

        this.inventoryService.stock(this.api.getInitInventory());
        this.ingredients = this.api.getInitIngredients();
        let menu = this.api.getInitMenu();

        for(let i = 0; i < menu.length; i++){
            for(let j = 0; j < menu[i].ingredients.length; j++){
                menu[i].ingredients[j].ingredient = this.ingredients[menu[i].ingredients[j].ingredient - 1];
            }
        }

        this.menuService.setMenu(menu);
    }

    getDrink(id){
        return this.menuService.getMenuItem(id);
    }

    setDrink(id){
        this.drink = id;
        this.directions = null;
    }

    setDirections(){
        this.directions = true;
        this.drink = null;
    }

    buyDrink(menuItem){

        for(let i = 0; i < menuItem.drink.ingredients.length; i++){

            let dIng = menuItem.drink.ingredients[i];
            let ing = dIng.ingredient;
            let id = ing.id;

            this.inventoryService.inventory[id] = this.inventoryService.inventory[id] - dIng.qty;
            this.menuService.updateMenuItems();
        }

    }

    reStock(){

        for(let k in this.inventoryService.inventory ){
            this.inventoryService.inventory[k] += 10;
        }

        this.menuService.updateMenuItems();
    }

}

MainCtrl.$inject = [
    '$scope',
    'ApiService',
    'InventoryService',
    'MenuItemService',
    'MenuService'
];

export { MainCtrl };
