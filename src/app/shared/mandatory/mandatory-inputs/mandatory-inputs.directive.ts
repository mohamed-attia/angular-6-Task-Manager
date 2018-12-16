import { forEach } from '@angular/router/src/utils/collection';
import { Subject } from 'rxjs';
import { CheckMandatoryServiceService } from './../check-mandatory-service/check-mandatory-service.service';
import { Directive, HostListener, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
  selector: '[appMandatoryInputs]'
})
export class MandatoryInputsDirective implements OnDestroy {
  formGroup: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Output() ValidStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private checkMandatorySer: CheckMandatoryServiceService) {
    this.checkMandatorySer.validateResultItem.subscribe(validResult => {
      this.ValidStatus.emit(validResult);
    });
  }

  ngOnDestroy() {
    console.log('---------- destroy Directive Input ---------- ');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.checkMandatorySer.resetAll();
  }
}
