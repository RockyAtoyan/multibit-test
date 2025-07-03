import { Component, Input } from '@angular/core';
import { cn } from '../../util';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link' =
    'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() class = '';

  get buttonClasses(): string {
    const baseClasses = [
      'font-medium',
      'rounded',
      'transition-colors',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      this.fullWidth ? 'w-full' : '',
    ];

    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary: 'bg-primary hover:bg-primary/80 text-white focus:ring-blue-500',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      ghost:
        'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300',
      link: 'bg-transparent hover:underline text-blue-600 hover:text-blue-800 focus:ring-blue-300',
    };

    return cn(
      ...baseClasses,
      sizeClasses[this.size],
      variantClasses[this.variant],
      this.class
    );
  }
}
