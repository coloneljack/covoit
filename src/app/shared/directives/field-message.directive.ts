import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appFieldMessage]'
})
export class FieldMessageDirective implements DoCheck {

  @Input('appFieldMessage') field: FormControl;
  @Input() patternMessage: string;

  constructor(public el: ElementRef, private renderer: Renderer2) {}

  ngDoCheck() {
    if (this.field && this.field.errors) {
      this.displayErrorMessage();
    }
  }

  private displayErrorMessage() {
    this.el.nativeElement.innerHTML = this.getErrorMessage();
  }

  private getErrorMessage(): string {
    let errorMessage = 'Ce champ comporte des erreurs.';
    if (this.field.hasError('required')) {
      errorMessage = 'Ce champ est requis.';
    }
    if (this.field.hasError('min')) {
      const min = this.field.getError('min').min;
      errorMessage = `Ce champ doit être supérieur ou égal à ${min}.`;
    }
    if (this.field.hasError('max')) {
      const max = this.field.getError('max').max;
      errorMessage = `Ce champ doit être inférieur ou égal à ${max}.`;
    }
    if (this.field.hasError('minlength')) {
      const minLength = this.field.getError('minlength').requiredLength;
      errorMessage = `Ce champ doit contenir ${minLength} caractères minimum.`;
    }
    if (this.field.hasError('maxlength')) {
      const maxLength = this.field.getError('maxlength').requiredLength;
      errorMessage = `Ce champ doit contenir ${maxLength} caractères maximum.`;
    }
    if (this.field.hasError('unique')) {
      errorMessage = `Cette valeur a déjà été saisie.`;
    }
    if (this.field.hasError('pattern') && this.patternMessage) {
      errorMessage = this.patternMessage;
    }
    if (this.field.hasError('matDatepickerParse')) {
      errorMessage = 'La valeur n\'est pas au bon format';
    }
    return errorMessage;
  }
}
