var w = 500;
var h = 400;
var unsorted = [];
var sorted = [];
var currentFinished = true;
var position = 0;
var k = 0;
var l = 0;

var progress = document.getElementById('progress');

function setup() {
    createCanvas(500, 400);

    for (let i = 0; i < w; i++) {
        unsorted.push(random(h - 50));
    }
    sorted.push(unsorted.shift());
}

function draw() {
    background(51);
    stroke(255);
    console.log(frameRate());
    for (var i = 0; i < sorted.length; i++) {
        line(i, h, i, h - sorted[i]);
    }
    for (var i = 0; i < unsorted.length; i++) {
        line(i, h, i, h - unsorted[i]);
    }

    for (let amt = 0; amt < 300; amt++) {
        if (!currentFinished) {
            var a = sorted[k];
            var b = sorted[k - 1];
            if (a > b) {
                Swap(sorted, k, k - 1);
            }
            if (l >= 0) {
                k--;
                if (k <= 0) {
                    k = sorted.length - 1;
                    l--;
                }
            } else {
                currentFinished = true;
            }

        } else {
            sorted.push(unsorted.shift());
            k = sorted.length - 1;
            l = sorted.length - 1;
            currentFinished = false;
        }
        if (unsorted.length === 0) {
            console.log('Finished');
            noLoop();
        }
    }

}

function Swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}