import { NgModule } from '@angular/core';
import { InscriptionService} from './inscription.service'
import { SummonerService } from './summoner.service'
import { EquipmentService } from './equipment.service'

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    SummonerService,
    EquipmentService
  ]
})
export class ServiceProxyModule { }
