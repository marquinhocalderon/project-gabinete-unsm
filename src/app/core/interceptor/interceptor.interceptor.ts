import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { TokensService } from '../auth/tokens.service';
import { Router } from '@angular/router';
import { ApipeticionesService } from '../servicios/apipeticiones.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(TokensService);
  const router = inject(Router);
  const token = authService.tieneToken();
  const api = inject(ApipeticionesService);

  // Lista de rutas que no requieren autorización
  const urlsSinAutorizacion: string[] = ['/auth/login'];

  // Verificar si la URL actual está en la lista de rutas sin autorización
  if (urlsSinAutorizacion.some((url) => req.url.includes(url))) {
    return next(req);
  }

  if (token) {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(request).pipe(
      catchError((error: any) => {
        console.error('Error por permisos:', error.error); // Registro del error
        Swal.fire({
          icon: 'error',
          title: `Codigo Error : ${error.error.statusCode}`,
          text: `${error.error.message}`,
          confirmButtonText: 'Aceptar'
        })
        return throwError(() => error);
      })
    );
  } else {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error de no tener token:', error.error); // Registro del error
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación. Por favor, inicie sesión nuevamente.',
          text: `${error.error.message}`,
          confirmButtonText: 'Aceptar'
        }).then(() => {
          router.navigate(['/']);
        });
        return throwError(() => error);
      })
    );
  }
};

