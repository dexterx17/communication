import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ClientPreviewComponent } from './components/client-preview/client-preview.component';

import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
	{ path: '', component: MainContentComponent },
  { path: 'client/:id', component: ClientPreviewComponent},
	{ path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    SidenavComponent,
    ToolbarComponent,
    ClientPreviewComponent
  ],
  imports: [
  	CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJ920_mAj7Lcw2Mc6JOqrxbJEKHQS0BRE'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
