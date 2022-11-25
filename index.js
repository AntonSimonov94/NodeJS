const [date] = process.argv.splice(2);

let toTime = date.split('-');
let time = new Date(toTime[3], toTime[2] - 1, toTime[1], toTime[0]);

const printTimer = (to) => {
    let timer = setInterval(function () {
        let now = new Date();
        if (now >= to) {
            console.log('Время вышло')
            clearInterval(timer);
        } else {
            let timer = new Date(to.getTime() - now.getTime());
            console.clear();
            console.log('Осталось: ' + (timer.getUTCFullYear() - 1970) + ' - год(а)(лет), ' + timer.getMonth() + ' - месяц(а,ев),  ' + (timer.getDate() - 1) + ' - дня(ей),  ' + (timer.getHours() - 3) + ' - час(а,ов), ' + timer.getMinutes() + ' - минут(а,ы), ' + timer.getSeconds() + ' - секунд(а,ы).')
        }
    }, 1000);
}

printTimer(time);
