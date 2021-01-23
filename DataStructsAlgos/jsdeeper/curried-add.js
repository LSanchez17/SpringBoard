function curriedAdd(total) {
    if(total){
        return function addMe(num){
            if(num){
                total += num;
                return addMe;
            }
            return total;
        };
    }
    return 0;
}

module.exports = { curriedAdd };
