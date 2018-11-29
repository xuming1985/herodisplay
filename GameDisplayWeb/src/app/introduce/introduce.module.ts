import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroduceRoutingModule } from './introduce-routing.module';
import { SummonerComponent } from './summoner/summoner.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  imports: [
    CommonModule,
    IntroduceRoutingModule
  ],
  declarations: [
    SummonerComponent,
    InscriptionComponent, 
    EquipmentComponent, 
    HeroComponent
  ]
})
export class IntroduceModule { }
