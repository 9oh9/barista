import { Ingredient, Drink, MenuItem } from './models';

class ApiService {
    constructor(){}

    getInitInventory(){
        return {
            1: 10,
            2: 10,
            3: 10,
            4: 10,
            5: 10,
            6: 10,
            7: 10,
            8: 10,
            9: 10
        }
    }

    getInitMenu(){

        return [
            {
                id: 1,
                name: 'Coffee',
                ingredients: [
                    {
                        ingredient: 1,
                        qty: 3
                    },
                    {
                        ingredient: 3,
                        qty: 1,
                    },
                    {
                        ingredient: 4,
                        qty: 1
                    }
                ]
            },
            {
                id: 2,
                name: 'Decaf Coffee',
                ingredients: [
                    {
                        ingredient: 2,
                        qty: 3
                    },
                    {
                        ingredient: 3,
                        qty: 1,
                    },
                    {
                        ingredient: 4,
                        qty: 1
                    }
                ]
            },
            {
                id: 3,
                name: 'Caffe Latte',
                ingredients: [
                    {
                        ingredient: 7,
                        qty: 2
                    },
                    {
                        ingredient: 5,
                        qty: 1,
                    }
                ]
            },
            {
                id: 4,
                name: 'Caffe Americano',
                ingredients: [
                    {
                        ingredient: 7,
                        qty: 3
                    }
                ]
            },
            {
                id: 5,
                name: 'Caffe Mocha',
                ingredients: [
                    {
                        ingredient: 7,
                        qty: 1
                    },
                    {
                        ingredient: 8,
                        qty: 1
                    },
                    {
                        ingredient: 5,
                        qty: 1
                    },
                    {
                        ingredient: 9,
                        qty: 1
                    }
                ]
            },
            {
                id: 6,
                name: 'Cappucino',
                ingredients: [
                    {
                        ingredient: 7,
                        qty: 2
                    },
                    {
                        ingredient: 5,
                        qty: 1
                    },
                    {
                        ingredient: 6,
                        qty: 1
                    }
                ]
            }
        ];

    }

    getInitIngredients(){
        return [
            {
                id: 1,
                name: 'Coffee',
                price: 0.75
            },
            {
                id: 2,
                name: 'Decaf Coffee',
                price: 0.75
            },
            {
                id: 3,
                name: 'Sugar',
                price: 0.25
            },
            {
                id: 4,
                name: 'Cream',
                price: 0.25
            },
            {
                id: 5,
                name: 'Steamed Milk',
                price: 0.35
            },
            {
                id: 6,
                name: 'Foamed Milk',
                price: 0.35
            },
            {
                id: 7,
                name: 'Expresso',
                price: 1.10
            },

            {
                id: 8,
                name: 'Cocoa',
                price: 0.90
            },
            {
                id: 9,
                name: 'Whipped Cream',
                price: 1.00
            }
        ];
    }

}

class InventoryService {
    constructor(){
        this.inventory =  {};
    }

    stock(data){
        this.inventory = data;
    }

}
InventoryService.$inject = [];

class MenuItemService {

    constructor(InventoryService){
        this.invService = InventoryService;
    }


    _calculateQty(drink){

        let numLeft = (req, avail) => { return ((avail - (avail % req)) / req ) };
        let qty = null;
        let inv = this.invService.inventory;
        let tmp;

        for(let i = 0; i < drink.ingredients.length; i++){

            tmp = numLeft(drink.ingredients[i].qty, inv[drink.ingredients[i].ingredient.id]);
            if(qty == null){
                qty = tmp;
            }
            else if(tmp <= qty){
                qty = tmp;
            }

        }

        return qty;
    }

    menuItemFactory(drink){
        let qty = this._calculateQty(drink);
        return new MenuItem(drink, qty);
    }

    updateMenuItem(menuItem){

        menuItem.qty = this._calculateQty(menuItem.drink);
        return menuItem;
    }


}
MenuItemService.$inject = ['InventoryService'];

class MenuService {
    constructor(MenuItemService){
        this.menu = [];
        this.menuItemService = MenuItemService;
    }

    setMenu(data){
        this.menu = [];
        for(let i = 0; i < data.length; i++){
            this.menu.push(this.menuItemService.menuItemFactory( new Drink(data[i])));
        }
    }

    updateMenuItems(){
        this.menu.forEach((e, i, a) => {
            this.menu[i] = this.menuItemService.updateMenuItem(e);
        });
    }

    getMenuItem(id){

        for(let i = 0; i < this.menu.length; i++){
            if(this.menu[i].drink.id == id) return this.menu[i];
        }

        return false;
    }

}
MenuService.$inject = ['MenuItemService'];

export { InventoryService, ApiService, MenuItemService, MenuService };
