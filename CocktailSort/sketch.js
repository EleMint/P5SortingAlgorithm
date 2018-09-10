var w = 500;
var h = 400;
var values = [];
var swapped = true;
var start = 0;
var end;
var fR = 0;
var fRC = 0;
var IterationRate = 2;

function setup() {
    createCanvas(500, 400);

    for (var i = 0; i < w; i++) {
        values.push(random(h - 50));
    }
    end = values.length;
}

function draw() {
    background(51);
    fR += frameRate();
    fRC++;
    console.log('Average Frame Rate: ', fR / fRC);
    console.log('Percent Completed: ', (values.length - (end - start)) * 200 / values.length + '%');

    for (let amt = 0; amt < IterationRate; amt++) {

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
        }

        if (!swapped) {
            noLoop();
            Metrics();
            return;
        }

        swapped = false;

        end--;

        for (var i = end - 1; i >= start; i--) {
            if (values[i] > values[i + 1]) {
                Swap(values, i, i + 1);
                swapped = true;
            }
        }

        if (!swapped) {
            noLoop();
            Metrics();
            return;
        }

        start++;
    }
}

function Swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function Metrics() {
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
        DataPoints: w
    };
    database.ref('Algorithms/CocktailShaker').push(data);
}