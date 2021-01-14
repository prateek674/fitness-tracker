import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  // @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    // 100 for percentage and 1000 as we need in milli-secs
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // result here is the value bound to mat-dialog-close in stop-training-component.ts i.e. true or false
      // console.log(result);
      if (result) {
        // this.trainingExit.emit();
        this.trainingService.cancelExercise(this.progress);
      }
      else {
        // not cancelled. Continue progress
        this.startOrResumeTimer();
      }
    });
  }
}
