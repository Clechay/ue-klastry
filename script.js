/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("canvas#screen")
const ctx = canvas.getContext("2d")
const c = ctx;

// const parent = canvas.parentElement;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// canvas.addEventListener('paste', e => {console.log(e)})

let flowers = []

function loadData() {
  flowers = data.map( function(row, i){
    return {
      id: i,
      petal: {
        width: row[0],
        length: row[1]
      },
      sepal: {
        width: row[2],
        length: row[3]
      },
      centroid: undefined,
      dists: []
    }
  } )
  draw();
}

const centroids = [
  
]

const colors = ["red", "blue", "brown", "green", "orange", "violet", "aqua"]

let n = 3;
let k = 3;
let key = 'petal';

function randomizeCentroids() {
  centroids.length = 0;
  while(centroids.length < k){
    const r = flowers[Math.floor(flowers.length * Math.random())]
    if(!centroids.includes(r)) centroids.push(r);
  }
  loadData();
  // draw();
}


function dist(flower, centroid){
  return Math.sqrt( Math.pow(flower[key].width - centroid[key].width, 2) + Math.pow(flower[key].length - centroid[key].length , 2) )
}

function assignCentroids() {
  flowers.forEach( flower => {
    flower.dists = centroids.map( c => dist(flower, c) );
    let minD = Infinity;
    let minId = -1;
    flower.dists.forEach( (d,i) => {
      if(minD > d) {
        minD = d;
        minId = i;
      }
    })
    flower.centroid = centroids[minId];
  })
  draw();
}

function draw() {
  ctx.clearRect(0,0,10000,10000);

  flowers.forEach(  (flower,i) =>{
    if(flower.centroid) ctx.fillStyle = colors[centroids.indexOf(flower.centroid)];
    else ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(flower[key].width*100,canvas.height-flower[key].length*100,4,0,Math.PI*2);
    ctx.fill();
  })  
  
  centroids.forEach(  (centroid,i) =>{
    ctx.strokeStyle = colors[i];
    ctx.beginPath();
    ctx.arc(centroid[key].width*100,canvas.height-centroid[key].length*100,4,0,Math.PI*2);
    ctx.stroke();
  })
}

function improveCentroid(centroid){
  let n = 0;
  let Petal_width = 0;
  let Petal_length = 0;
  flowers.forEach( (flower,i) => {
    if(centroid === flower.centroid) {
      n++;
      Petal_width += flower[key].width;
      Petal_length += flower[key].length;
    }
  } )
  if(n <= 0) return;
  Petal_width /= n;
  Petal_length /= n;
  centroid[key].length = Petal_length;
  centroid[key].width = Petal_width;
}
function improve(){
  centroids.forEach( c => improveCentroid(c))
  draw()
}

const keyInput = document.querySelector("#key-input")
keyInput.onchange = (e => {
  key = keyInput.value

})
const kInput = document.querySelector("#k-input")
kInput.onchange = (e => {
  k = parseInt(e.target.value)
})

const nInput = document.querySelector("#n-input")
nInput.onchange = (e => {
  n = parseInt(e.target.value)
})

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function calcualate() {
  console.log(`calcualations will begin shortly`)
  console.dir({n,k,key})
  loadData();
  // await wait(200);
  randomizeCentroids();
  // await wait(200);
  assignCentroids();
  // await wait(800);
  for (let i = 0; i < n; i++) {

    improve();
    // await wait(500);
    assignCentroids();
    // await wait(500);
  }
  output.innerHTML = table(
    flowers.map(f=>{
      return [f.id, f[key].width, f[key].length, colors[centroids.indexOf(f.centroid)]]
    }),
    ['id',`${key} width`,`${key} length`,'assignd cluster']
  )
}

const randBtn = document.querySelector("#rand-btn")
randBtn.onclick = randomizeCentroids
const calcBtn = document.querySelector("#calc-btn")
calcBtn.onclick = calcualate
const bothBtn = document.querySelector("#both-btn")

const output = document.querySelector("#output")