import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntityContainerComponent } from './entity/entity-container/entity-container.component';
import { EntityComponent } from './entity/entity/entity.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityContainerComponent,
    EntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [EntityContainerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
