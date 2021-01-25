import { Subject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { UIService } from "../shared/ui.service";

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runningExercise: Exercise;
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService) { }

    fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
        /* 
        Even if this is called multiple times the subscription
        only executes when there is a change. So, this subscription 
        is not fetched everytime we go to new-training
        */
        // valueChanges gives the Observable that we subscribe to
        // valueChanges strips off the metadata like the ID
        // this.exercises = this.db.collection('availableExercises').valueChanges();    
        //snapshotChanges will give the ID as well
        this.fbSubs.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
            };
          });
        }).subscribe((exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            // emitting the exercises Changed list for the new-training.component.ts
            this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar('Fetching Exercises Failed. Try Again.', null, 3000);
            this.exerciseChanged.next(null);
        }));
    }

    startExercise(selectedId: string) {
        // updating single document
        // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise});
    }

    completeExercise() {
        this.addDatatoDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDatatoDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }
    
    fetchExercises() {
        // return this.exercises.slice();
        this.fbSubs.push(this.db.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                // emitting this
                this.finishedExercisesChanged.next(exercises);
            }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDatatoDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}