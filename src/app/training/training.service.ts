import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

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
    private exercises: Exercise[] = [];
    exercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore) { }

    fetchAvailableExercises() {
        // valueChanges gives the Observable that we subscribe to
        // valueChanges strips off the metadata like the ID
        // this.exercises = this.db.collection('availableExercises').valueChanges();    
        //snapshotChanges will give the ID as well
        this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        }).subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises;
            // emitting the exercises Changed list for the new-training.component.ts
            this.exercisesChanged.next([...this.availableExercises]);
        })
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise});
    }

    completeExercise() {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
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
    
    getExercises() {
        return this.exercises.slice();
    }
}