const Maths = require('./mathFunc');

test('Should return mean', () => {
    let numbers = [1,2,3,4,4];
    let mathsClass = new Maths('mean', numbers);
    let answer = 2.8;
    
    expect(mathsClass.calculate(mathsClass.method, mathsClass.numbers)).toEqual(answer);
})

test('Should return mode', () => {
    let numbers = [1,2,3,3,4];
    let otherNumbers = [1,2,3,4];
    let mathsClass = new Maths('mode', numbers);
    let otherMathsClass = new Maths('mode', otherNumbers);
    let firstAnswer = '3';
    let secondAnswer = 'No mode';

    expect(mathsClass.calculate(mathsClass.method, mathsClass.numbers)).toEqual(firstAnswer);
    expect(otherMathsClass.calculate(otherMathsClass.method, otherMathsClass.numbers)).toEqual(secondAnswer);
})

test('Should return median', () => {
    let numbers = [1,2,3,4,4];
    let otherNumbers = [1,2,3,4]
    let mathsClass = new Maths('median', numbers);
    let otherMathsClass = new Maths('median', otherNumbers);
    let answer = 3;
    let secondAnswer = 2.5;

    expect(mathsClass.calculate(mathsClass.method, mathsClass.numbers)).toEqual(answer);
    expect(otherMathsClass.calculate(otherMathsClass.method, otherMathsClass.numbers)).toEqual(secondAnswer);
})

test('Should return all three', () => {
    let numbers = [1,2,3,4,4,5];
    let mathsClass = new Maths('all', numbers);
    let answer = ['Mean: 3.1666666666666665', 'Median: 3.5', 'Mode: 4'];

    expect(mathsClass.doAllThree()).toEqual(answer);
})