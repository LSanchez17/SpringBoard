const Inventory = require('./logic');

let newStore = new Inventory();

const getOneItem = (item) => {
    return newStore.specificItem(item);
}

const getAllItems = () => {
    return newStore.allItems();
}

const addItem = (itemObj) => {
    newStore.addItem(itemObj);
    return {'Message': 'Item Added!',
            'Items': getAllItems()
            };
}

const deleteItem = (itemToDelete) => {
    newStore.deleteItem(itemToDelete);
    return {'Message': 'Item Deleted!',
            'Items': getAllItems()
            };
}

const updateItem = (itemUpdate) => {
    newStore.updateItem(itemUpdate);
    return {'Message': 'Item Updated!',
            'Items': getAllItems()
            };
}

const makeCatalog = () => {
    return newStore.catalog;
}

module.exports = {
    getOneItem,
    getAllItems,
    addItem,
    deleteItem,
    updateItem,
    makeCatalog
}