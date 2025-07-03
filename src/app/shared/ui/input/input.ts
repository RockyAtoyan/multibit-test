import {
  Component,
  EventEmitter,
  Input as InputDecorator,
  Output,
} from '@angular/core';
import { cn } from '../../util';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
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

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  get inputClasses(): string {
    return cn('block w-full rounded-md sm:text-sm p-2 border', this.class);
  }
}
