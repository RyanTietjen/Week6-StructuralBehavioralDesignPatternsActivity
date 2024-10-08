import { ICalculatorObserver } from "../interfaces/calculator-observer.interface";

export class CalculatorObserver implements ICalculatorObserver{
    update(message: string): void {
        console.log(message);
    }

}