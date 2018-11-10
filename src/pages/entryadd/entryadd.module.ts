import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryaddPage } from './entryadd';

@NgModule({
  declarations: [
    EntryaddPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryaddPage),
  ],
})
export class EntryaddPageModule {}
