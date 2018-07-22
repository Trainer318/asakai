'use strict'

let fs = require('fs');

let readline = require('readline');

let fFreshmanReadFile = './freshman_list.txt';

let fManagerReadFile = './manager_list.txt';

const dateStart = new Date(2018, 6, 2);

Date.prototype.msPERDAY = 1000 * 60 * 60 * 24;

Date.prototype.copy = function () {
    return new Date(this.getTime());
};

Date.prototype.getDaysBetween = function (d) {
    d = d.copy();
    var diff = d.getTime() - this.getTime();
    var days = Math.floor((diff) / this.msPERDAY);
    return days;
};

const daysBetween = dateStart.getDaysBetween(new Date(new Date().getTime() + (1000*60*60*24)));

let freshmanList = [];
let managerList = [];

let freshmanRd = readline.createInterface({
    input: fs.createReadStream(fFreshmanReadFile),
    console: false
});

freshmanRd.on('line',  (line) => {
    freshmanList.push(line);
});


let managerRd = readline.createInterface({
    input: fs.createReadStream(fManagerReadFile),
    console: false
});

managerRd.on('line',  (line) => {
    managerList.push(line);
});

if (process.argv.length === 2) {
    setTimeout(() => 
        console.log('明日の新卒担当は' + getElementInArray(freshmanList, daysBetween))
    , 10);
    setTimeout(() => 
    console.log('明日のマネージャー担当は' + getElementInArray(managerList, daysBetween))
    , 10);
    
}

if (process.argv[2] === '-f') {
    setTimeout(() => console.log(freshmanList) , 10);
}

if (process.argv[2] === '-m') {
    setTimeout(() => console.log(managerList) , 10);
}

function getElementInArray(array, orderNumber) {
    const arrayLength = array.length;
    const preIndex = orderNumber % arrayLength;
    const afIndex = (preIndex === 0) ? arrayLength - 1 : preIndex - 1;
    return array[afIndex];
}