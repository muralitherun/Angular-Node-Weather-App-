import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getWeatherReport(location: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/weatherReport', { params: { location } }).pipe(
      tap(response => {
        console.log('Location sent to backend:', location);
        console.log('Response from backend:', response);
      }),
      catchError(error => {
        console.log('Error:', error);
        return of(null);
      })
    );
  }
}