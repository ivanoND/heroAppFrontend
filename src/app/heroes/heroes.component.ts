import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  // questa sintassi allo stesso tempo dichiara un campo
  // privato con il nome fornito e lo inizializza con il
  // valore passato al costruttore
  constructor(private heroService: HeroService,
              private messageService: MessageService) {
    messageService.add('Creazione di HeroesComponent');
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => this.heroes = heroes);
  }

  add(name: string,email: string): void {
    name = name.trim();
    if (name) {
      // questo vale in ES6
      // {nomeVar} leggetela come {nomeVar: 'valore di quela variabile'}
      // per cui se la variabile name vale 'Superman'
      // il costrutto {name} e' equivalente a {name: 'Superman'}
      // in generale vale {var1,var2} => {var1: var1, var2: var2}
      // la seconda parte ha a che fare con typeScript ed e' un'operazione a livello di sintassi
      // analoga all'operatore di cast di Java.
      this.heroService.addHero({name,email} as Hero)
        .subscribe(hero => this.getHeroes());
    }
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
      .subscribe(() => this.getHeroes());
  }
}
