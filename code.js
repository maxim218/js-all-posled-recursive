"use strict";

let mass = ["maxim", "nina", 10, 20];

///////////////////////////////////////

function copyMass(arr) {
    let buffer = [];
    for(let i = 0; i < arr.length; i++) {
        buffer[i] = arr[i];
    }
    return buffer;
}

function createObject(value, arr) {
    return {
        value: value,
        arr: copyMass(arr),
        dict: {}
    };
}

function deleteElement(arr, x) {
    let buffer = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] !== x) {
            buffer.push(arr[i]);
        }
    }
    return buffer;
}


let root = createObject(0, mass);

function makePosled(element) {
    if(element.arr.length === 0) {
        return;
    }
    for(let i = 0; i < element.arr.length; i++) {
        element.dict["" + element.arr[i]] = createObject(element.arr[i], deleteElement(element.arr, element.arr[i]));
        makePosled(element.dict["" + element.arr[i]]);
    }
}

makePosled(root, mass);

let answer = [];
let s = "";

function treePrinter(element, s) {
    s = s + "," + element.value;
    answer.push(s);
    for(let xxx in element.dict) {
        treePrinter(element.dict[xxx], s);
    }
}

treePrinter(root, s);

let maxLen = -1;

for(let i = 0; i < answer.length; i++) {
    let len = answer[i].split(",").length;
    if(len > maxLen) {
        maxLen = len;
    }
}

function modifyString(s) {
    let buffer = [];
    let mass = s.split(",");
    for(let i = 0; i < mass.length; i++) {
        let q = mass[i] + "";
        if(q !== "" && q!== "0") {
            buffer.push(q);
        }
    }
    return buffer.join(" ");
}

let bigString = "";
let number = 0;

for(let i = 0; i < answer.length; i++) {
    let len = answer[i].split(",").length;
    if(len === maxLen) {
        number++;
        bigString = bigString + number + ")&nbsp;&nbsp;&nbsp;&nbsp;" + modifyString(answer[i]) + "<br>";
    }
}

bigString = "Начальный массив: " + mass.join(" , ") + "<br><br>" + bigString;
document.getElementById("result").innerHTML = bigString;
