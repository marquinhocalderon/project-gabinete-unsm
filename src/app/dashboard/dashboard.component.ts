import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarMenuComponent,RouterOutlet, AsideMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor() { }

  sidebarAbierto: boolean = false;

  recogerRespuestaDelHijo(event: boolean) {
    this.sidebarAbierto = event;
    console.log('sidebarAbierto', this.sidebarAbierto);
  }

  ngOnInit() {
    initFlowbite();
  }

}
