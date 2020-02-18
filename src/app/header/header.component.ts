import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;

  constructor(private routerService: RouterService) { }

  toggle() {
    if (this.isNoteView) {
      this.routerService.routeToListView();
    } else {
      this.routerService.routeToNoteView();
    }
    this.isNoteView = !this.isNoteView;
  }
}
