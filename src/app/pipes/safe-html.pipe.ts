import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private ds: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.ds.bypassSecurityTrustHtml(value);
  }
}
