import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "src/app/message.service";
import { Observable, of } from "rxjs";
import { Ability } from "src/app/ability";
import { tap, catchError } from "rxjs/operators";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class AbilityService {

    // URL to web api
  private abilitiesUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
    messageService.add('Creazione di AbilityService');
  }

  getAbilities(): Observable<Ability[]> {
    return this.http.get<Ability[]>(this.abilitiesUrl.concat("/abilities"))
      .pipe(
        tap(abilities => this.log(`fetched ${abilities.length} abilities`)),
        catchError(this.handleError('getAbilities', []))
      );
  }  

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AbilityService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}