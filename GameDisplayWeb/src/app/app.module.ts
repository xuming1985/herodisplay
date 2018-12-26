import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { ServiceProxyModule } from './shared/service-proxy/service-proxy.module'
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { SideBarComponent } from './shared/layout/side-bar/side-bar.component';
import { PortalComponent } from './portal/portal.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { StockComponent } from './stock/stock.component';
import { BugComponent } from './bug/bug.component';
import { AppSessionService } from './shared/auth/app-session.service';

export function appInitializerFactory(injector: Injector,
  platformLocation: PlatformLocation) {
  return () => {

    return new Promise<boolean>((resolve, reject) => {
      var appSessionService: AppSessionService = injector.get(AppSessionService);
      appSessionService.init().then(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    PortalComponent,
    IntroduceComponent,
    StockComponent,
    BugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceProxyModule,
    NgxEchartsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
