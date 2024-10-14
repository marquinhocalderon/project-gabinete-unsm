import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seguridad-aside',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './seguridad-aside.component.html',
  styleUrl: './seguridad-aside.component.css'
})
export class SeguridadAsideComponent {

  flecha: boolean = false 

  clickFecha(){
    this.flecha = !this.flecha;
}

clickFecha22() {
  this.flecha = false;
}

}
