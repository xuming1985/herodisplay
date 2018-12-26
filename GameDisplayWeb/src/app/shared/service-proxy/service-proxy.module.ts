import { NgModule } from '@angular/core';
import { InscriptionService} from './inscription.service'
import { SummonerService } from './summoner.service'
import { EquipmentService } from './equipment.service'
import { StockService } from './stock.service'
import { BugService } from './bug.service'
import { TokenAuthService } from './tokenAuth.service'

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    SummonerService,
    EquipmentService,
    StockService,
    BugService,
    TokenAuthService
  ]
})
export class ServiceProxyModule { }
