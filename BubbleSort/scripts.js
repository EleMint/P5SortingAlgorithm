var values = [];
var i = 0;
var j = 0;
var fR = 0;
var fRC = 0;
var count = 0;
var IterationRate = 10000;

function setup() {
    createCanvas(1500, 400);

    for (let i = 0; i < width; i++) {
        values[i] = random(height - 50);
    }
}

function draw() {
    background(51);
    strokeWeight(1);
    fR += frameRate();
    fRC++;

    console.log('Average Frame Rate: ', fR/fRC);
    console.log('Percent Completed: ', i * 100 / values.length + '%');
    for (let i = 0; i < values.length; i++) {
        stroke(255);
        line(i, height, i, height - values[i]);
    }
    
    for (let amt = 0; amt < IterationRate; amt++) {
        count += 2;
        var a = values[j];
        var b = values[j + 1];
        if (a > b) {
            Swap(values, j, j + 1);
        }
        if (i < values.length) {
            j++;
            if (j >= values.length - i - 1) {
                j = 0;
                i++
            }
        } else {
            noLoop();
            console.log('Times Array Was Accessed ' + nfc(count) + ' Times');
            console.log('Finished, Iterated At ' + nfc(IterationRate) + ' Times A Frame');
            break;
        }
    }
}

function Swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    return arr;
}