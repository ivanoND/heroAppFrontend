import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {Hero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() {
    console.log('Creazione di HeroService');
  }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
