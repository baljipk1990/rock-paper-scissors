import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';
const routes: Routes = [
  {path:'',component:GameComponent},
  {path:'score',component:ScoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
