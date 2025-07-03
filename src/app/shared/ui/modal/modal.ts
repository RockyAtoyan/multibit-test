import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

  @HostListener('document:keydown.escape', ['$event' as 'KeyboardEvent'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isOpen) {
      this.close();
    }
  }
}
