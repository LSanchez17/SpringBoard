class Inventory{
    constructor(){
        this.catalog = this.makeCatalog();
    }

    makeCatalog(){
        //creates an array of objects for our fake store
        let catalog = [];
        let itemNames = ['Popsicle','Cheerios','Ice Cream','Coke','Water','Potatos','Bread','Mayo','Lunch Meat'];
        
        for(let i = 0; i < itemNames.length; i++){
            let itemPrice = Number((Math.random() * 5).toFixed(2));

            catalog.push({'name': itemNames[i],
                          'price': itemPrice})
        }
        return catalog;
    }

    deleteItem(item){
        //deletes item from our object array
        return this.catalog.filter(goods => {
            if(goods.name.toLowerCase() === item.toLowerCase()){
                this.catalog.splice(this.catalog.indexOf(goods), 1);        
                return `Deleted ${item}! ${this.catalog}`;
            }
        })
    }

    addItem(item){
        //adds an item to our object array
        this.catalog.push(item);
        return `Added ${item}! ${this.catalog}`;
    }

    updateItem(item){
        //updates an item in our object array
        this.catalog.filter(goods => {
            if(goods.name.toLowerCase() === item.name.toLowerCase()){
                goods.name = item.name || goods.name;
                goods.price = item.price || goods.price;
            }
        })
        return `Item: ${item} Updated! ${this.catalog}`;
    }

    specificItem(item){
        //returns one individual item
        return this.catalog.filter(goods => {
            if(goods.name.toLowerCase() === item.toLowerCase()){
                return `Item found! ${goods}`;
            }
        })
    }

    allItems(){
        return this.catalog;
    }
}

module.exports = Inventory;