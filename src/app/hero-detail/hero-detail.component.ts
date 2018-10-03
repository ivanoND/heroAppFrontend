import {Component, Input, OnInit ,AfterContentInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Ability } from 'src/app/ability';
import { AbilityService } from '../abilityService';
import * as _ from "lodash";
import { SortablejsOptions } from 'angular-sortablejs';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;
  heroAbilities: Ability[]=[];
  notHeroAbilities: Ability[]=[] ;

  options: SortablejsOptions = {
    group: 'test',
    draggable: 'mat-list-item'
  };

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private abilityService : AbilityService
  ) {
  }
  

  ngOnInit() {
    
    this.getHero();
  }
  

  getNotHeroAbilities(id:number): void {
    this.abilityService.getNotHeroAbilities(id)
      .subscribe(abilities => this.notHeroAbilities=abilities); 
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero =>{ this.hero = hero; this.heroAbilities=hero.abilities; this.getNotHeroAbilities(hero.id);});
  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero.abilities=this.heroAbilities;
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  add(abilityDescription: string): void{
    var ability = new Ability();
    ability.description=abilityDescription;
    this.abilityService.addAbility(ability)
    .subscribe((ability)=>this.notHeroAbilities.push(ability));
  }


}
