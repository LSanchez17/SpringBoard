const Inventory = require('./logic');
const { deleteItem } = require('./middlewareShop');
const newStore = require('./middlewareShop');

describe('Tests middleware functions and class methods', () => {
    let inventory;
    beforeEach(() => {
        inventory = newStore.makeCatalog();
    })    

    afterEach(() => {
        inventory = '';
    })

    test('Gets entire catalog(hard coded', () => {

        expect(newStore.getAllItems()).toEqual(inventory);
    })

    test('Get individual Item', () => {
        let itemInfo = newStore.getOneItem('Coke');

        expect(newStore.getOneItem('coke')).toEqual(itemInfo);
    })

    test('Add individual item', () => {
        let newItem = {"name": 'Burrito',
                        "price": 5};
        inventory.push(newItem);

        let added = newStore.addItem(newItem);
        
        expect(added.Items).toEqual(inventory);
    })

    test('Update single item', () => {
        let update = {"name": 'Coke',
                      "price": 100};
        let inventory = newStore.updateItem(update);

        expect(inventory).toHaveProperty('Items', ['price', 3], 100);
    })

    test('Delete single item', () => {
        let deletedItem = 'Coke';

        let inventory = newStore.deleteItem(deletedItem);

        expect(inventory).not.toHaveProperty('Items.name', 'Coke');
    })
})