import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

import { CheckMandatoryServiceService } from './../check-mandatory-service/check-mandatory-service.service';

@Directive({
  selector: '[appMandatoryFormGroup]'
})
export class MandatoryFormGroupDirective implements OnDestroy, AfterViewInit {
  public validInput = true;
  public formGroup: any;
  checkFields: boolean = false;
  parent;
  // tslint:disable-next-line:no-input-rename
  @Input('appMandatoryFormGroup') whichForm: string = '';

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private checkMandatorySer: CheckMandatoryServiceService
  ) {
    this.checkMandatorySer.checkALlMandatoryItem.subscribe(checkFields => {
      this.checkFields = checkFields;
      if (this.checkFields) {
        let s = this.checkRequired();
        if (s != undefined) {
          this.checkMandatorySer.fillStatusArray(s);
        }
      }
    });

    this.checkMandatorySer.clearAllMandatoryItems.subscribe(clearValidations => {
      this.checkFields = false;
      if (clearValidations) {
        let input = this.clearMessageErrors();
        if (input != undefined) {
          this.checkMandatorySer.fillStatusArray(input);
        }
      }
    });
  }

  ngAfterViewInit() {
    console.log(this.el.nativeElement);
    console.log('------------ After View init -------------------');

    this.formGroup = this.el.nativeElement;
    this.parent = this.renderer.parentNode(this.formGroup);
    this.AddStarToLabels();
    setTimeout(() => {
      this.checkMandatorySer.setTotal(this.checkMandatorySer.getTotal() + 1);
    }, 50);

    // this.checkMandatorySer.resetAll();
  }
  ngOnDestroy() {
    if (this.checkMandatorySer.getTotal() > 0) {
      this.checkMandatorySer.setTotal(this.checkMandatorySer.getTotal() - 1);
    }
    console.log('------------ Destroy View init -------------------');

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('focusout', ['$event'])
  onFocusout(event: any) {
    event.stopPropagation();
    let item = (<Element>event.target).tagName.toLowerCase();

    if (this.checkFields) {
      if (item !== 'span' && item !== 'a' && item !== 'div') {
        this.checkMandatorySer.validate();
      }
      // ---------------------  app-wizard-search / app lookup cases ---------------
      if (item === 'a') {
        setTimeout(() => {
          this.checkMandatorySer.validate();
        }, 50);
      }
    }
  }

  @HostListener('input', ['$event'])
  OnChange(event: any) {
    event.stopPropagation();
    let item = (<Element>event.target).tagName.toLowerCase();

    if (this.checkFields) {
      if (item !== 'span' && item !== 'a' && item !== 'div') {
        this.checkMandatorySer.validate();
      }
      // ---------------------  app-wizard-search / app lookup cases ---------------
      if (item === 'a') {
        setTimeout(() => {
          this.checkMandatorySer.validate();
        }, 50);
      }
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event) {
    let clicked;
    let clickedParent;
    let clickedSingleSelect;

    if (
      event &&
      event.target &&
      event.target.parentNode &&
      event.target.parentNode.parentNode &&
      event.target.parentNode.parentNode.parentNode &&
      event.target.parentNode.parentNode.parentNode.parentNode
    ) {
      clickedParent = (<Element>event.target.parentNode).classList;
      clickedSingleSelect = (<Element>event.target.parentNode.parentNode.parentNode).classList;
      clicked = (<Element>event.target.parentNode.parentNode.parentNode.parentNode).classList;
    } else {
      return;
    }

    if (this.checkFields) {
      if (
        (clicked !== undefined && clicked.contains('search-results')) ||
        (clickedSingleSelect !== undefined && clickedSingleSelect.contains('search-results')) ||
        (clickedParent !== undefined && clickedParent.contains('app-select-panel'))
      ) {
        setTimeout(() => {
          this.checkMandatorySer.validate();
        }, 50);
      }
    }
  }

  @HostListener('click', ['$event'])
  clickInside(event: any) {
    let clicked = (<Element>event.target).tagName.toLowerCase();
    let clickedType = (<Element>event.target).getAttribute('type');
    event.stopPropagation();
    if (this.checkFields) {
      if (
        (clicked === 'input' && clickedType === 'radio') ||
        clicked === 'li' ||
        clicked === 'a' ||
        clicked === 'select'
      ) {
        this.checkMandatorySer.validate();
      }
    }
  }

  public checkRequired() {
    if (this.formGroup != undefined) {
      this.validInput = true;

      if (this.checkFields) {
        // ---------------------- in case Input Text/Number/TextArea/appwizardsearch/appLookup ----------------------
        if (this.formGroup.children.length > 0) {
          if (this.formGroup.children[0].tagName !== 'DIV') {
            let input = this.formGroup.querySelector('input');
            let textarea = this.formGroup.querySelector('textarea');
            let appwizardsearch = this.formGroup.querySelector('app-wizard-search');
            let select = this.formGroup.querySelector('select');
            let daterangePickerDropdown = this.formGroup.querySelector('app-daterangepicker-dropdown');
            let appSelect = this.formGroup.querySelector('app-select');

            if (input != null) {
              if (input.value === '') {
                this.renderer.addClass(this.formGroup, 'requiredInput');
                this.createErrorMessage('Required');
                this.validInput = false;
              } else {
                this.renderer.removeClass(this.formGroup, 'requiredInput');
                this._removePreviousErrors();
                this.validInput = true;
              }
            }
            if (textarea != null) {
              if (textarea.value === '') {
                this.renderer.addClass(this.formGroup, 'requiredInput');
                this.createErrorMessage('Required');
                this.validInput = false;
              } else {
                this.renderer.removeClass(this.formGroup, 'requiredInput');
                this._removePreviousErrors();
                this.validInput = true;
              }
            }
            if (appwizardsearch != null) {
              if (
                appwizardsearch.getAttribute('ng-reflect-selected') == null ||
                appwizardsearch.getAttribute('ng-reflect-selected') === ''
              ) {
                this.renderer.addClass(this.formGroup, 'requiredInput');
                this.createErrorMessage('Required');
                this.validInput = false;
              } else {
                this.renderer.removeClass(this.formGroup, 'requiredInput');
                this._removePreviousErrors();
                this.validInput = true;
              }
            }

            if (select != null) {
              console.log('------------------ select -----------------');

              if (select.classList.contains('ng-dirty') || select.classList.contains('hasValue')) {
                this.renderer.removeClass(this.formGroup, 'requiredInput');
                this._removePreviousErrors();
                this.validInput = true;
              } else {
                this.renderer.addClass(this.formGroup, 'requiredInput');
                this.createErrorMessage('Required');
                this.validInput = false;
              }
            }

            if (daterangePickerDropdown != null) {
              if (
                daterangePickerDropdown.querySelector('.daterange-dropdown_toggle').textContent.indexOf('Select') > -1
              ) {
                this.renderer.addClass(this.formGroup, 'requiredInput');
                this.createErrorMessage('Required');
                this.validInput = false;
                console.log('daterangePickerDropdown has No Value');
              } else {
                this.renderer.removeClass(this.formGroup, 'requiredInput');
                this._removePreviousErrors();
                this.validInput = true;
                console.log('daterangePickerDropdown has Value');
              }
            }

            if (appSelect !== null) {
              let buttonInside = appSelect.querySelector('button');
              if (buttonInside.classList.contains('no-values-selected')) {
                this.renderer.addClass(this.formGroup, 'requiredInput');
                this.createErrorMessage('Required');
                this.validInput = false;
              } else {
                this.renderer.removeClass(this.formGroup, 'requiredInput');
                this._removePreviousErrors();
                this.validInput = true;
              }
            }
          } else if (this.formGroup.children[0].tagName === 'DIV') {
            // ---------------------- in case Input radio ----------------------

            let checkedRadio = false;

            for (let i = 0; i < this.formGroup.children.length; i++) {
              if (
                this.formGroup.children[i].classList.contains('gpd-radio-btn') &&
                this.formGroup.children[i].children[0].checked
              ) {
                checkedRadio = true;
                break;
              } else if (
                this.formGroup.children[i].classList.contains('gpd-radio-btn') &&
                !this.formGroup.children[i].children[0].checked
              ) {
                checkedRadio = false;
                continue;
              }
            }

            if (!checkedRadio) {
              this.renderer.addClass(this.formGroup, 'RadioRequired');
              this.createErrorMessage('Required');
              this.validInput = false;
            } else if (checkedRadio) {
              this.renderer.removeClass(this.formGroup, 'RadioRequired');
              this._removePreviousErrors();

              this.validInput = true;
            }
          }
        }
        return this.validInput;
      }
    }
  }

  public AddStarToLabels() {
    if (this.formGroup.children) {
      for (let i = 0; i < this.formGroup.children.length; i++) {
        if (this.formGroup.children[i].tagName === 'LABEL') {
          this.renderer.addClass(this.formGroup.children[0], 'requiredlabel');
        }
      }
    }
  }
  private createErrorMessage(errorMsg) {
    const messageParragraph = this.renderer.createElement('p');
    this.renderer.setAttribute(messageParragraph, 'i18n', '@@Required');
    const text = this.renderer.createText(errorMsg);
    this.renderer.addClass(messageParragraph, 'error-message');
    this.renderer.addClass(messageParragraph, 'mandatory');

    const errorsMessages = this.formGroup.querySelectorAll('.error-message.mandatory');
    const errorContainer = this.formGroup.querySelectorAll('.input-error-group');
    if (!this.parent.closest('datatable-body') && errorsMessages.length === 0) {
      this.renderer.appendChild(messageParragraph, text);
      if (errorContainer.length > 0) {
        this.renderer.appendChild(errorContainer[0], messageParragraph);
      } else {
        this.renderer.appendChild(this.formGroup, messageParragraph);
      }
    } else if (this.parent.closest('table') || this.parent.closest('ngx-datatable')) {
      this.renderer.addClass(messageParragraph, 'tooltiptext');
      this.renderer.appendChild(messageParragraph, text);
      this.renderer.addClass(this.parent, 'requiredInputFV');
      this.renderer.addClass(this.parent, 'tooltipTable');
      if (errorContainer.length > 0) {
        this.renderer.insertBefore(this.parent, messageParragraph, errorContainer[0]);
      } else {
        this.renderer.insertBefore(this.parent, messageParragraph, this.formGroup);
      }
    }
  }

  private _removePreviousErrors(): void {
    const errorsMessages = this.formGroup.querySelectorAll('.error-message.mandatory');
    for (let errorsMessage of errorsMessages) {
      let parent = this.renderer.parentNode(errorsMessage);
      parent.removeChild(errorsMessage);
    }
  }

  private clearMessageErrors() {
    if (this.formGroup != undefined) {
      this.validInput = true;
      if (this.formGroup.children.length > 0) {
        if (this.formGroup.children[0].tagName !== 'DIV') {
          this.renderer.removeClass(this.formGroup, 'requiredInput');
          this._removePreviousErrors();
          this.validInput = true;
        } else if (this.formGroup.children[0].tagName === 'DIV') {
          let radioButton = false;

          for (let i = 0; i < this.formGroup.children.length; i++) {
            if (this.formGroup.children[i].classList.contains('gpd-radio-btn')) {
              radioButton = true;
              break;
            }
          }

          if (radioButton) {
            this.renderer.removeClass(this.formGroup, 'RadioRequired');
            this.validInput = true;
          }
        }
      }
      return this.validInput;
    }
  }
}
