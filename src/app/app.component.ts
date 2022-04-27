import { Component } from '@angular/core';
import { Observable } from "rxjs";
import {  ViewChild } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AudioFile } from './audio-file.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title= "Holi";
  
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.speakerCollection = db.collection("canciones");
    this.speakerList = this.speakerCollection.valueChanges();
  }

  speakerCollection: AngularFirestoreCollection<AudioFile>;
  speakerList: Observable<AudioFile[]>;  
  @ViewChild("file") file;
  files: Set<File> = new Set();

  url: any =
    "https://i.pinimg.com/originals/d0/69/ce/d069cef7326f3ff0cf64a72e56c374be.jpg";
  _file;
  name = "";
  id = null;
  isChanged = false;

  onKey(event: any) {
    // without type info
    this.name = event.target.value;
  }

  add() {
    if (this.isChanged) {
      const filePath = "songs/" + this.name;
      const ref = this.storage.ref(filePath);
      ref.put(this._file).then(() => {
        ref.getDownloadURL().subscribe(url => {
          this.url = url;
          if (this.id) {
            this.update();
          } else {
            this.create();
          }
        });
      });
    } else {
      if (this.id) {
        this.update();
      }
    }
    this.isChanged = false;
    this.file.nativeElement.value = "";
  }

  update() {
    
    this.speakerCollection
      .doc(this.id)
      .update({ name: this.name, url: this.url });
    this.url =
      "https://i.pinimg.com/originals/d0/69/ce/d069cef7326f3ff0cf64a72e56c374be.jpg";
    this.name = "";
    this.id = null;
  }

  create() {
    const id = this.db.createId();
    const name = this.name;
    this.speakerCollection.doc(id).set({ name, url: this.url, id });
    this.url =
      "https://i.pinimg.com/originals/d0/69/ce/d069cef7326f3ff0cf64a72e56c374be.jpg";
    this.name = "";
    this.id = null;
  }

  remove(id: string) {
    if (confirm("Are you sure to delete this song from your list?")) {
      //const filePath = "imagenes" + this.name;
      this.speakerCollection.doc(id).delete();
      
      
    }
  }

  select(speaker) {
    this.url = speaker.url;
    this.name = speaker.name;
    this.id = speaker.id;
  }

  onFilesAdded(target: any) {
    this.isChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
    };
    if (target.files.length > 0) {
      this._file = target.files[0];
      reader.readAsDataURL(this._file);
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }
}  
