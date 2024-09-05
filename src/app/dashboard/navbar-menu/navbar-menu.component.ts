import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.css'
})
export class NavbarMenuComponent {

  @Output() clickDelMenu = new EventEmitter<boolean>();

  clickMenu: boolean = false;

  
  siesMobile : boolean = false;

  enviarRespuestaAlPadre() {
    this.clickMenu = !this.clickMenu;
    this.clickDelMenu.emit(this.clickMenu);
  }

  verificarDispositivo(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // Aquí puedes agregar lógica adicional basada en 'isMobile'
    this.siesMobile = isMobile;
    console.log('isMobile', this.siesMobile);
  }

  ngOnInit(): void {
    this.verificarDispositivo(); // Cambié 'vew' a 'verificarDispositivo'
  }


}
