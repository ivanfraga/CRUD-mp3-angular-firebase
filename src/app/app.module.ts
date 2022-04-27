import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//importar clase
import { AppComponent } from './app.component';

//import classes of Firebase
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

//import previus firebase configuration 

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
