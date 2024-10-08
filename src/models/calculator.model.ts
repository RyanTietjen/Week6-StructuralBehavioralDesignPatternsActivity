
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { IContext } from '../interfaces';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { ICalculatorObserver } from '../interfaces/calculator-observer.interface';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { EnteringFirstNumberState } from '../states/entering-first-number-state';
import { StateData } from './state-data.model';

export class CalculatorModel implements ICalculatorModel, IContext {

  private _state: ICalculatorState;
  private observers: ICalculatorObserver[] = [];

  public constructor() {
    this._state = new EnteringFirstNumberState(this, new StateData.Builder().build());
  }

  public changeState(newState: ICalculatorState): void {
    this._state = newState;
  }

  public pressNumericKey(key: NumericKeys): void {
    this._state.digit(key);
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this._state.binaryOperator(key);
  }

  public pressActionKey(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this._state.clear();
        break;
      case ActionKeys.DOT:
        this._state.decimalSeparator();
        break;
      case ActionKeys.EQUALS:
        this._state.equals();
        break;
      default:
        throw new Error('Invalid Action');
    }
  }

  public attach(observer: ICalculatorObserver): void {
    if (!this.observers.includes(observer))
      this.observers.push(observer);
  }

  public detach(observer: ICalculatorObserver): void {
    this.observers.splice(this.observers.indexOf(observer))
  }

  public notify(message:string): void{
    for (let obs of this.observers)
        obs.update(message);
  }

  public display(): string {
    return this._state.display();
  }

}
