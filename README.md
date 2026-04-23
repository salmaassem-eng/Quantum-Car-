# 🚗 Car Factory Design (OOP)

This project demonstrates a simple **Object-Oriented Design** for a car factory system.

The goal is to design a flexible system where:
- A car can use different types of engines
- Engines can be replaced easily
- A hybrid engine switches behavior based on speed
- A factory creates cars based on engine type

---

## 🧠 Concepts Used

- Object-Oriented Programming (OOP)
- Abstraction
- Inheritance
- Polymorphism
- Composition
- Factory Pattern

---

## 📦 Features

### 🚘 Car
- Can start and stop
- Can accelerate (+20 km/h up to 200)
- Can brake (-20 km/h down to 0)
- Notifies the engine whenever speed changes
- Allows engine replacement

### ⚙️ Engines

#### 1. GasolineEngine
- Basic engine behavior

#### 2. ElectronicEngine
- Basic engine behavior

#### 3. MixedHybridEngine
- Uses:
  - Electric engine below 50 km/h
  - Gas engine at 50 km/h and above
- Switches automatically between engines
- Never runs both at the same time

---

## 🏭 Car Factory

The `CarFactory` is responsible for:
- Creating cars with a specific engine type
- Abstracting engine creation from the user

---

🧪 Example Usage

const car = CarFactory.createCar("hybrid");
car.start();
car.accelerate(); // 20 → electric
car.accelerate(); // 40 → electric
car.accelerate(); // 60 → switches to gas
car.brake();
car.stop();

## ▶️ How to Run

* Run it in:
   - Browser console
   - VS Code Live Server
