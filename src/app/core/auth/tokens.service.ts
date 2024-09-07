import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor() { }

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any;
      return decodedToken;
    } else {
      return null;
    }
  }

  tieneToken() {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

}
