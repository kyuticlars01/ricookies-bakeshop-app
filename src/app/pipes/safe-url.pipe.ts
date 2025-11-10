import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  // Set to true since it's a standalone component and pipe is imported there
  standalone: true 
})
export class SafeUrlPipe implements PipeTransform {

  // Inject the DomSanitizer to tell Angular the URL is safe
  constructor(private sanitizer: DomSanitizer) {}

  // The transform method marks the URL as a safe resource to be used in an iframe's 'src' attribute
  transform(url: string): SafeResourceUrl {
    // Sanitizes the value as a URL resource, allowing it to be used in elements like <iframe> src
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}