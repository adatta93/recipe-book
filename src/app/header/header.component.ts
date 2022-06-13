import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() onPageChange = new EventEmitter<string>();
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLinkClick(pageName) {
    this.onPageChange.emit(pageName);
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
