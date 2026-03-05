import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

export function handleError(
  error: HttpErrorResponse | ErrorEvent,
): Observable<never> {
  let errorMessage = 'Unknown error occurred';

  if (error instanceof ErrorEvent) {
  // Ошибка на стороне клиента
  errorMessage = `Client error: ${error.message}`;
} else {
  // Ошибка от сервера
  errorMessage = `Server error ${error.status}: ${error.message}`;
}

console.error('API Request Error:', errorMessage, error);
return throwError(() => new Error(errorMessage));
}
