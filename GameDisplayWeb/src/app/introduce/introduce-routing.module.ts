import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummonerComponent } from './summoner/summoner.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hero',
    pathMatch: 'full'
  },
  { path: 'hero', component: HeroComponent },
  { path: 'summoner', component: SummonerComponent },
  { path: 'inscription', component: InscriptionComponent},
  { path: 'equipment', component: EquipmentComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IntroduceRoutingModule { }
