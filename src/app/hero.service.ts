import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {Hero} from './hero';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // URL to web api
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
    messageService.add('Creazione di HeroService');
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.log('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  // public Observable<Hero> getHero(int id)
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.log(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
