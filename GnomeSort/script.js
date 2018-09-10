var w = 500;
var h = 400;
var unsorted = [];
var sorted = [];
var currentFinished = true;
var position = 0;
var k = 0;
var l = 0;
var fR = 0;
var fRC = 0;
var count = 0;
var IterationRate = 3000000;

function setup() {
    createCanvas(500, 400);

    for (let i = 0; i < w; i++) {
        unsorted.push(random(h - 50));
    }
    sorted.push(unsorted.shift());
    count++;
}

function draw() {
    background(51);
    stroke(255);
    fR += frameRate();
    fRC++;

    console.log('Average Frame Rate: ', fR/fRC);
    console.log('Percent Completed: ', sorted.length * 100 / w + '%');
    for (var i = 0; i < sorted.length; i++) {
        line(i, h, i, h - sorted[i]);
    }
    for (var i = 0; i < unsorted.length; i++) {
        line(i, h, i, h - unsorted[i]);
    }

    for (let amt = 0; amt < IterationRate; amt++) {
        if (!currentFinished) {
            count += 2;
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
            count++;
            sorted.push(unsorted.shift());
            k = sorted.length - 1;
            l = sorted.length - 1;
            currentFinished = false;
        }
        if (unsorted.length === 0) {
            Metrics();
            noLoop();
            break;
        }
    }

}

function Swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function Metrics() {
    console.log('Times Array Was Accessed ' + nfc(count) + ' Times');
    
    console.log('Finished, Iterated At ' + nfc(IterationRate) + ' Times A Frame');

    console.log('Completed At An Average Of ' + fR + ' Frames Per Second. With A Total Frame Count Of ' + fRC);

    console.log('Sort Took ' + fR / fRC + ' Seconds To Complete');

    var config = {
        apiKey: Keys.apiKey,
        authDomain: Keys.authDomain,
        databaseURL: Keys.databaseURL,
        projectId: Keys.projectId,
        storageBucket: Keys.storageBucket,
        messagingSenderId: Keys.messagingSenderId
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var data = {
        IterationRate: IterationRate,
        FrameRate: fR,
        FrameCount: fRC,
        DataPoints: w,
        ArrayAccess: count
    };
    database.ref('Algorithms/Gnome').push(data);
}