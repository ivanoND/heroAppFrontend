import {Component, Input, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Ability } from 'src/app/ability';
import { AbilityService } from '../abilityService';
import * as _ from "lodash";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  allAbilities: Ability[];
  heroAbilities: Ability[];
  selectedAbilities: Ability[]=[];
  notHeroAbilities: Ability[] = [];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private abilityService : AbilityService
  ) {
  }
  

  ngOnInit() {
    
    this.getHero();
    this.getAbilities();
  }

  onClick(element,ability,list):void{
    var array=this.selectedAbilities;
    if(element.selected==true){
      array.push(ability);
    }else if(element.selected == false){
      array= _.without(array,ability);
    }
    this.selectedAbilities=array;
    console.log("selected abilities:--------");
    array.forEach(element => {
      console.log(element);
    });
  }

  getAbilities(): void {
    this.abilityService.getAbilities()
      .subscribe(abilities => {this.allAbilities=abilities}); 
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero =>{ this.hero = hero; this.heroAbilities=hero.abilities; });
  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero.abilities=this.selectedAbilities;
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }


}
