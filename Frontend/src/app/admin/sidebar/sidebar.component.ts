import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarExpanded: boolean = true;
  selectedItem: string | null = null;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  selectItem(item: string) {
    this.selectedItem = item;
  }

}
