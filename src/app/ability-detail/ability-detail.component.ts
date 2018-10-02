import { Component, OnInit } from '@angular/core';
import { Ability } from '../ability';
import { ActivatedRoute } from '@angular/router';
import { AbilityService } from '../abilityService';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.css']
})
export class AbilityDetailComponent implements OnInit {

  ability : Ability;


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private abilityService : AbilityService
    
    ) { }

  ngOnInit() {

    this.getAbility();
  }
  getAbility(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.abilityService.getAbility(id)
      .subscribe(ability =>{ this.ability = ability;});
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.abilityService.updateAbility(this.ability)
      .subscribe(() => this.goBack());
  }

}
