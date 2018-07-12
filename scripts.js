let height = 500;
let width = 750;
let scl = 250;
let dataset = [];
let tempx;

function setup() {
    createCanvas(width, height);
    background(55);
    for (let i = 0; i < width / scl; i++) {
        dataset.push([i * scl, 0, scl, Math.floor(random(height))]);
    }
    console.log(dataset);
    frameRate(1);
}

function bubbleSort() {
    for (let i = 0; i < dataset.length - 1; i++) {
        if (dataset[i][3] > dataset[i + 1][3]) {
            tempx = dataset[i][0];
            dataset[i][0] = dataset[i + 1][0];
            dataset[i + 1][0] = tempx;
        }
    }
    console.log(dataset);
}

function draw() {
    noStroke();
    
    for (let i = 0; i < dataset.length; i++) {
        
        rect(dataset[i][0], dataset[i][1], dataset[i][2], dataset[i][3]);
    }
    bubbleSort();
}