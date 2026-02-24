import {Injectable} from '@angular/core';
import {AUTH_TOKEN_KEY_NAME} from '../constants/const';
import {Token} from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(): Token | null {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
      if (token) {
        return token;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error reading token from localStorage:', error);
      return null;
    }
  }

  public setToken(token: Token) {
    try {
      if(!token || token.trim() === '') {
        return false;
      }
      localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
      return true;
    } catch (error) {
      console.error('Error set token to localStorage:', error);
      return false;
    }
  }

  public removeToken() {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
      return true;
    } catch (error) {
      console.error('Error deleting token from localStorage:', error);
      return false;
    }
  }
}
