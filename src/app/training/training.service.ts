import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as fromTraining from './training.reducer';
import * as TrainingActions from './training.actions';
import * as UI from '../shared/ui.actions';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore, 
    private uiService: UIService,
    private store: Store<fromTraining.State>
    ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        // throw(new Error());
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      })
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new TrainingActions.SetAvailableTraining(exercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
        this.exercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new TrainingActions.SetStartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new TrainingActions.SetStopTraining());
    });    
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExercise).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new TrainingActions.SetStopTraining());
    });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new TrainingActions.SetFinishedTrainings(exercises));
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
