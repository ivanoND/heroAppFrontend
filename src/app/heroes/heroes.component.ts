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

  add(name: string): void {
    name = name.trim();
    if (name) {
      this.heroService.addHero({name} as Hero)
        .subscribe(hero => this.heroes.push(hero));
    }
  }
}
