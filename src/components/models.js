
class Ingredient {

    construct(data){
        this.id = data.id || null;
        this.name = data.name || null;
        this.price = data.price || null;
    }

}

class DrinkIngredient {

    constructor(data){
        this.qty = data.qty || null;
        this.ingredient = data.ingredient || null;
    }

    get price() {
        let p = this.qty * this.ingredient.price;
        return p;
    }

}

class Drink {

    constructor(data){
        this.id = data.id || null;
        this.name = data.name || null;
        this._ingredients = data.ingredients || null;
    }

    get ingredients(){
        let ing = [];
        this._ingredients.forEach((e, i, a) => { ing.push( new DrinkIngredient(e) ) });

        return ing;
    }

    get price(){
        let p = this.ingredients.reduce((a, b) => { return (a + b.price) }, 0);
        return p;
    }

}

class MenuItem {
    constructor(drink, qty){
        this.drink = drink || null;
        this.qty = qty || null;
    }
}

export { Ingredient, Drink, MenuItem };
