import { Component } from '@angular/core';
import { ApipeticionesService } from '../../../../core/servicios/apipeticiones.service';
import { PostUsuariosComponent } from './post-usuarios/post-usuarios.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [PostUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: any[] = []; // Variable para almacenar los usuarios
  url = import.meta.env.NG_APP_API + "/peticion/usuarios/all"; // URL de la API

  constructor(private api: ApipeticionesService) { }

  ngOnInit(): void {
    this.getUsuarios(); // Llamada a la función para obtener usuarios al inicializar el componente
  }

  recogerPostCompletado(event: any) {
    if (event) {
      this.getUsuarios(); // Llamada a la función para obtener usuarios al completar el registro
      }
  }

  getUsuarios(): void {
    this.api.getApi(this.url).subscribe({
      next: (data: any) => {
        this.usuarios = data; // Asignar los datos recibidos a la variable 'usuarios'
        
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }
}