
const flock = [];


function setup() {

  createCanvas(2000, 1200);

  for(let i = 0; i < 50; i++)
  flock.push(new Boid());

}

function draw() {
  background(51);

  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();



  }
}