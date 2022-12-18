class Boid {

    constructor(){

        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.5;
        this.maxSpeed = 10;
    }

    edges() {

        if (this.position.x > width){
            this.position.x = 0;
        } else if (this.position.x < 0){

            this.position.x = width;
        }

        if (this.position.y > width){
            this.position.y = 0;
        } else if (this.position.y < 0){

            this.position.y = width;
        }



    }


    align(boids) {

        let perceptionRadius = 10;

        let steering = createVector();
        let total = 0;

        for(let other of boids){

            let d = dist(

                this.position.x, this.position.y, other.position.x, other.position.y
            )/2;
            if (other != this && d < perceptionRadius) {

                steering.add(other.velocity);
                total++;
            }

            
        }
        
        if(total > 0){
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        

        }
        return steering;
    }

    cohesion(boids) {

        let perceptionRadius = 20;

        let steering = createVector();
        let total = 0;

        for(let other of boids){

            let d = dist(

                this.position.x, this.position.y, other.position.x, other.position.y
            )/2;
            if (other != this && d < perceptionRadius) {

                steering.add(other.position);
                total++;
            }

            
        }
        
        if(total > 0){
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        

        }
        return steering;
    }

    separation(boids) {

        let perceptionRadius = 20;

        let steering = createVector();
        let total = 0;

        for(let other of boids){

            let d = dist(

                this.position.x, this.position.y, other.position.x, other.position.y
            )/2;
            if (other != this && d < perceptionRadius) {
                let diff =  p5.Vector.sub(this.position, other.position);  
                diff.div(d); 
                steering.add(diff);
                total++;
            }

            
        }
        
        if(total > 0){
        steering.div(total);
        
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        

        }
        return steering;
    }

    flock(boids){
        
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        
    }
    
    update(){

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);


    }
    
    
    
    
    show() {

        strokeWeight(1);
        stroke(255);
        
        fill(random(1,255), random(1,255), random(1, 255));
        circle(this.position.x, this.position.y, 10);



    }    


}