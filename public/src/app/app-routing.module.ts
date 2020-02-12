import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckwordComponent } from './checkword/checkword.component';
import { WordlistComponent } from './wordlist/wordlist.component';




const routes: Routes = [
  {path: '', component:CheckwordComponent},
  {path: 'List', component:WordlistComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CheckwordComponent,WordlistComponent]

