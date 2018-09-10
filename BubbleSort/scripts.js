var values = [];
var i = 0;
var j = 0;

function setup() {
    createCanvas(500, 400);

    for (let i = 0; i < width; i++) {
        values[i] = random(height - 50);
    }
}

function draw() {
    background(51);
    strokeWeight(1);
    for (let i = 0; i < values.length; i++) {
        stroke(255);
        line(i, height, i, height - values[i]);
    }
    
    for (let amt = 0; amt < 300; amt++) {
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
            console.log('Finished');
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