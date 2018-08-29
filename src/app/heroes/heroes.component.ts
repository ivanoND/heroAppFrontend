import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes = HEROES;

  constructor() {
  }

  ngOnInit() {
  }
  // in java sarebbe public void onSelect(Hero hero)
  // noinspection TsLint
  onSelect(hero: Hero) {
    // sintassi ES6 per interpolazione stringe, usare il carattere
    // backtick ` per delimitare le stringhe e l'espressione
    // ${qualche espressione} per inserire un espressione
    // http://geckosoft.it/blog/come-digitare-il-catattere-backtick-accento-grave-e-tilde-su-windows-utilizzando-una-tastiera-italiana-senza-tastierino-numerico
    console.log(`Hai cliccato sull'eroe ${hero.name}`);
    // in javascript 5 sarebbe cosi
    // console.log('Hai cliccato sull\'eroe' + hero.name);
    // assegno l'eroe selezionato
    this.selectedHero = hero;
  }
}
