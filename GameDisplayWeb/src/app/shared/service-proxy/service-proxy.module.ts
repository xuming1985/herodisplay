import { NgModule } from '@angular/core';
import { InscriptionService} from './inscription.service'
import { SummonerService } from './summoner.service'
import { EquipmentService } from './equipment.service'
import { StockService } from './stock.service'
import { BugService , UserService, ProjectService} from './bug.service'
import { TokenAuthService } from './tokenAuth.service'

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    SummonerService,
    EquipmentService,
    StockService,
    BugService,
    UserService,
    ProjectService,
    TokenAuthService
  ]
})
export class ServiceProxyModule { }
