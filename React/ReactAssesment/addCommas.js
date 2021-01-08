const addCommas = (num) => {
    let newNum = num.toString().split('');
    // console.log(num) logs array of numbers
    let negativeSign = '-';


    if(num > 0){
        if(newNum.length < 4){
            return parseInt(newNum.join(''));
        }

        if(newNum.length >=4){
            console.log(num)
            for(let i=newNum.length; i>0; i-=3){
                console.log(i)
                if(newNum[i]){
                    newNum.splice(i, 0, ',');
                }
            }
            return newNum.join('');
        }
    }
    if(num < 0){
        if(newNum.length < 4){
            return parseInt(newNum.join(''));
        }
        //now remove sign for larger numbers
        newNum.splice(0,1);

        if(newNum.length >=4){
            console.log(num)
            for(let i=newNum.length; i>0; i-=3){
                console.log(i)
                if(newNum[i]){
                    newNum.splice(i, 0, ',');
                }
            }
            newNum.splice(0,0,negativeSign);
            return newNum.join('');
        }
    }
}



// console.log(addCommas(5));
// console.log(addCommas(50));
// console.log(addCommas(500));
// console.log(addCommas(-1000));
// console.log(addCommas(-10000));
// console.log(addCommas(-100000));
// console.log(addCommas(-1000000));
// console.log(addCommas(-1000000));
// console.log(addCommas(-100000000));
// console.log(addCommas(-10000000000));
// console.log(addCommas(-10000000000000));


module.exports = addCommas;