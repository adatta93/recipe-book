import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;

  @HostListener("click") openDropdown() {
    this.isOpen = !this.isOpen;
    // if (Array.from(this.elementRef.nativeElement.classList).includes("open")) {
    //   this.ren.removeClass(this.elementRef.nativeElement, "open");
    // } else {
    //   this.ren.addClass(this.elementRef.nativeElement, "open");
    // }
  }
}
