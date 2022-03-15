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

const flowers = data.map( function(flower){
  const o = {}
  flower.forEach((liczba,i) => o[labels[i]] = liczba)
  return o;
} )

const centroids = [
  // {
  //   color: 'red',
  //   Petal_width: 10 * Math.random(),
  //   Petal_length: 10 * Math.random(),
  // },
  // {
  //   color: 'blue',
  //   Petal_width: 1,
  //   Petal_length: 1,
  // },
  // {
  //   color: 'brown',
  //   Petal_width: 10 * Math.random(),
  //   Petal_length: 10 * Math.random(),
  // }
]

let r1 = flowers[Math.floor(flowers.length * Math.random())]
let r2 = flowers[Math.floor(flowers.length * Math.random())]
let r3 = flowers[Math.floor(flowers.length * Math.random())]

centroids.push({
  color: "red",
  Petal_width: r1.Petal_width,
  Petal_length: r1.Petal_length
})
centroids.push({
  color: "blue",
  Petal_width: r2.Petal_width,
  Petal_length: r2.Petal_length
})
centroids.push({
  color: "brown",
  Petal_width: r3.Petal_width,
  Petal_length: r3.Petal_length
})

function dist(flower, centroid){
  return Math.sqrt( Math.pow(flower.Petal_width - centroid.Petal_width, 2) + Math.pow(flower.Petal_length - centroid.Petal_length , 2) )
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
  
}

function draw() {
  ctx.clearRect(0,0,10000,10000);

  flowers.forEach(  flower =>{
    if(flower.centroid) ctx.fillStyle = flower.centroid.color;
    else ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(flower.Petal_width*100,canvas.height-flower.Petal_length*100,4,0,Math.PI*2);
    ctx.fill();
  })  
  
  centroids.forEach(  centroid =>{
    ctx.strokeStyle = centroid.color;
    ctx.beginPath();
    ctx.arc(centroid.Petal_width*100,canvas.height-centroid.Petal_length*100,4,0,Math.PI*2);
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
      Petal_width += flower.Petal_width;
      Petal_length += flower.Petal_length;
    }
  } )
  if(n <= 0) return;
  Petal_width /= n;
  Petal_length /= n;
  centroid.Petal_length = Petal_length;
  centroid.Petal_width = Petal_width;
}
function improve(){
  centroids.forEach( c => improveCentroid(c))
}

function init(){
  assignCentroids()
  draw()
}
function imp(){
  improve()
  assignCentroids()
  draw()
}

init();

setInterval(imp, 100);