var w = 500;
var h = 400;
var values = [];
var swapped = true;
var start = 0;
var end;
var counter = 0;


function setup() {
    createCanvas(500, 400);
    for (var i = 0; i < w; i++) {
        values.push(random(h - 50));
    }
    end = values.length;
}

function draw() {
    background(51);
    for (var i = 0; i < values.length; i++) {
        stroke(255);
        line(i, h, i, h - values[i]);
    }

    swapped = false;

    for (var i = start; i < end - 1; i++) {
        if (values[i] > values[i + 1]) {
            Swap(values, i, i + 1);
            swapped = true;
        }
        counter++;
    }

    if (!swapped) {
        noLoop();
        console.log("FINNISHED");
    }

    swapped = false;

    end--;

    for (var i = end - 1; i >= start; i--) {
        if (values[i] > values[i + 1]) {
            Swap(values, i, i + 1);
            swapped = true;
        }
        counter++;
    }

    start++;
    console.log(counter);
}

function Swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}