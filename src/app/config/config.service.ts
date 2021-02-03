import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
// using the same api call to get total pages and getting the population data
//otherwise we can create a new function which will make seperate call without any pages count so that we can get the total pages 
//if we dont have to show sorting on the complete data we can make lazy api calls and load initial pages and when user scrolls down 
//will make a seperate call in the background to update the list with new data

  getPopulation(year, pages): Observable<any> { 
    const populationApiUrl = 'http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL'
    const options = { params: new HttpParams({fromString:`format=json&date=${year}&per_page=${pages}`}) } ;
    return this.http.get(populationApiUrl, options).pipe(catchError(this.handleError));
  }

  getGdp(year, pages):Observable<any> {
      const gdpUrl = 'http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD';
      const options = { params: new HttpParams({fromString:`format=json&date=${year}&per_page=${pages}`}) } ;
   return this.http.get(gdpUrl, options).pipe(catchError(this.handleError));;
  }
}

// for our own apis we can create models
// and then we can define the observable type do directly access the propertirs after subscribing