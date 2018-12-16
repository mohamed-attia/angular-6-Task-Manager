import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CheckMandatoryServiceService {
  private checkALlMandatory = new BehaviorSubject<boolean>(false);
  private validateResult = new BehaviorSubject<boolean>(false);
  private clearAllMandatory = new BehaviorSubject<boolean>(false);

  checkALlMandatoryItem = this.checkALlMandatory.asObservable();
  validateResultItem = this.validateResult.asObservable();
  clearAllMandatoryItems = this.clearAllMandatory.asObservable();

  private arrayOfstatus: Array<boolean> = [];
  private totalInputs: number = 0;

  constructor() {}

  resetAll() {
    this.arrayOfstatus = [];
    this.totalInputs = 0;
    this.checkALlMandatory.next(false);
    this.clearAllMandatory.next(true);
    console.log('Reset All');
  }

  validate() {
    this.arrayOfstatus = [];
    this.checkALlMandatory.next(true);
  }

  resetValidations() {
    this.clearAllMandatory.next(true);
  }

  fillStatusArray(item) {
    this.arrayOfstatus.push(item);
    console.log('------------ Status ---------- ');
    console.log(this.arrayOfstatus);
    console.log('------------ Total ---------- ');
    console.log(this.getTotal());
    // tslint:disable-next-line:triple-equals
    if (this.arrayOfstatus.length == this.getTotal()) {
      this.validateResult.next(!this.hasErrorForm());
      console.log(!this.hasErrorForm());
    }
  }
  setTotal(t) {
    this.totalInputs = t;
  }
  getTotal() {
    return this.totalInputs;
  }

  hasErrorForm() {
    return this.arrayOfstatus.indexOf(false) > -1;
  }
}
