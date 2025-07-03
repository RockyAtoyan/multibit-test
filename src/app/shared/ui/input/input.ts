import {
  Component,
  EventEmitter,
  forwardRef,
  Input as InputDecorator,
  Output,
} from '@angular/core';
import { cn } from '../../util';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  @InputDecorator() id: string = `input-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @InputDecorator() type: string = 'text';
  @InputDecorator() label: string = '';
  @InputDecorator() placeholder: string = '';
  @InputDecorator() hint: string = '';
  @InputDecorator() error: string = '';
  @InputDecorator() value: string = '';
  @InputDecorator() required: boolean = false;
  @InputDecorator() disabled: boolean = false;
  @InputDecorator() class: string = '';
  @InputDecorator() control: FormControl = new FormControl();

  @Output() valueChange = new EventEmitter<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.value = value || '';
    console.log(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get inputClasses(): string {
    return cn(
      'block w-full rounded-md sm:text-sm p-2 px-4 border placeholder:opacity-50',
      this.class
    );
  }
}
