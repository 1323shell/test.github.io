import { Component, Input, Output, OnInit, AfterContentChecked, EventEmitter, forwardRef, ElementRef, HostListener } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS, } from '@angular/forms';


@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomSelectComponent), multi: true }
  ]
})
export class CustomSelectComponent implements OnInit, AfterContentChecked, ControlValueAccessor {

  @Input()
  settings: any;
  @Input()
  options: any = null;
  @Output()
  onChange = new EventEmitter();
  @Output()
  onDelete = new EventEmitter();
  public optionSelected = null;
  public optionsList = null;
  public isVisible: boolean = false;
  public defaultSettings = {
    placeholder: 'Выберите категорию сферы услуг',
    useTag: false
  };

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
  }

  ngAfterContentChecked() {
    this.getOptions();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isVisible = false;
    }
  }

  propagateChange = (_: any) => {};

  propagateTouched = (_: any) => {};

  validateFn: any = () => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  writeValue(value: any ) {
    if (value) {
      this.optionSelected = value;
    } else {
      this.optionSelected = null;
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  private getOptions() {
    let options = null;
    if (this.optionSelected) {
      let isDuplicate = false;
      this.options.forEach(item => {
        if (item.id == this.optionSelected.id) {
          isDuplicate = true;
        }
      });
      if (!isDuplicate) {
        options = this.options.slice();
        options.push(this.optionSelected);
      }
    }
    this.optionsList = options ? options : this.options;
    if (this.optionsList) {
      this.optionsList.sort((a, b) => {
        return a.name.toLowerCase() > b .name.toLowerCase();
      });
    }
  }

  public selectDropdownTogle(event): void {
    if (event.target.tagName !== 'SPAN') {
      this.isVisible = !this.isVisible;
    }
  }

  public onSelect(event): void {
    const value = {id: +event.target.id, name: event.target.innerText};
    if (this.optionSelected && value.id == this.optionSelected.id) {
      this.onDelete.emit(this.optionSelected);
      this.optionSelected = null;
      this.propagateChange(null);
      this.isVisible = false;
    } else {
      this.optionSelected = value;
      this.propagateChange(value);
      this.onChange.emit(value);
      this.isVisible = false;
    }
  }

  public onDeleteOptSelected(event): void {
    this.onDelete.emit(this.optionSelected);
    this.optionSelected = null;
    this.propagateChange(null);
    this.isVisible = false;
  }
}
