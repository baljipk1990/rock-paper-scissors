import { Component } from '@angular/core';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  result!: any;
  constructor(private scoreService: ScoreService) {
    this.scoreService.getAll().subscribe((res) => {
      this.result = res;      
    })
  }
}
