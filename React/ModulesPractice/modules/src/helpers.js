const choice = (items) => {
    return items[Math.floor(Math.random()*items.length-1)];
}

const remove = (items, item) => {
    items.filter(currItem => {
        if(currItem === item){
            items.splice(items.indexOf(currItem), 1);
            return items;
        }
        return undefined;
    })
}

export {choice, remove};