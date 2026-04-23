// first I'll implement engine which responsible for all internal implementation and it's types so
class Engine {
    constructor() {
        this.engineSpeed = 0;
        this.running = false;
    }

    start() {
        this.running = true;
        this.engineSpeed = 0;
        console.log(`${this.constructor.name} started`);
    }

    stop() {
        this.engineSpeed = 0;
        this.running = false;
        console.log(`${this.constructor.name} stopped`);
    }

    increase() {
        this.engineSpeed++;
    }

    decrease() {
        if (this.engineSpeed > 0) this.engineSpeed--;
    }

      //here we notify if increase or decreased happen
    updateSpeed(carSpeed) {
        while (this.engineSpeed < carSpeed) this.increase();
        while (this.engineSpeed > carSpeed) this.decrease();
        console.log(`${this.constructor.name} changed to ${carSpeed}`);
    }
}

// types:
class GasolineEngine extends Engine {}
class ElectronicEngine extends Engine {}

class MixedHybridEngine extends Engine {
    constructor() {
        super();
        this.gas = new GasolineEngine();
        this.electric = new ElectronicEngine();
        this.active = this.electric;
    }

    start() {
        this.running = true;
        this.active = this.electric;
        this.active.start();
    }

    stop() {
        this.gas.stop();
        this.electric.stop();
        this.running = false;
    }

    updateSpeed(speed) {
        let next = speed < 50 ? this.electric : this.gas;

        if (this.active !== next) {
            this.active.stop();
            next.start();
            this.active = next;
            console.log(`Switched to ${this.active.constructor.name}`);
        }

        this.active.updateSpeed(speed);
        this.engineSpeed = this.active.engineSpeed;
    }
}

// second car which use engine 
class Car {
    constructor(engine) {
        this.engine = engine;
        this.speed = 0;
    }

    start() {
        this.speed = 0;
        this.engine.start();
        this.engine.updateSpeed(0);
    }

    stop() {
        while (this.speed > 0) this.brake();
        this.engine.stop();
    }

    accelerate() {
        if (!this.engine.running) return console.log("Start first!");

        this.speed = Math.min(this.speed + 20, 200);
        this.engine.updateSpeed(this.speed);
        console.log("Speed:", this.speed);
    }

    brake() {
        this.speed = Math.max(this.speed - 20, 0);
        this.engine.updateSpeed(this.speed);
        console.log("Speed:", this.speed);
    }

        //if we want to replace engine while driving 
    replaceEngine(engine) {
        this.engine = engine;
        this.engine.start();
        this.engine.updateSpeed(this.speed);
    }
}


// class which we will make objects with specific engine ==> we can replace it 
class CarFactory {
    static createCar(type) {
        if (type === "gas") return new Car(new GasolineEngine());
        if (type === "electric") return new Car(new ElectronicEngine());
        if (type === "hybrid") return new Car(new MixedHybridEngine());
    }
}

// ===== TEST =====

// Gas car
const car1 = CarFactory.createCar("gas");
car1.start();
car1.accelerate();
car1.accelerate();
car1.brake();
car1.stop();

console.log("------");

// electric car
const car2 = CarFactory.createCar("electric");
car2.start();
car2.accelerate();
car2.accelerate();
car2.brake();
car2.stop();

console.log("------");

// Hybrid car
const car3 = CarFactory.createCar("hybrid");
car3.start();
car3.accelerate(); // 20 electric
car3.accelerate(); // 40 electric
car3.accelerate(); // 60  gas
car3.stop();

console.log("------");

// Replacement
car3.replaceEngine(new ElectronicEngine());
car3.accelerate();