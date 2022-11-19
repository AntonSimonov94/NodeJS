import colors from 'colors';


const [start, end] = process.argv.splice(2);


const simpleNumber = (rangeStart, rangeEnd) => {
    let arr = [];
    for (let i = Number(rangeStart); i <= Number(rangeEnd); i++) {
        let n = 0;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                n = 0;
                break;
            } else n = 1;
        }
        if (n === 1) arr.push(i);
    }
    return arr;
}

const changeColors = (array) => {
    let i = 0;
    array.forEach((num) => {
        let color = [colors.green, colors.yellow, colors.red]
        if (i < color.length-1) {
            console.log(color[i](num));
            i++;
        } else {
            console.log(color[i](num));
            i = 0;
        };
    })
}

if ((start) && (end) && (Number(end) >= Number(start))) {
    let arrNumber = simpleNumber(start, end);
    if (arrNumber.length === 0) {
        console.log('В данном диапозоне простых чисел нет');
    } else changeColors(arrNumber)
} else console.log('Неверный диапозон чисел');