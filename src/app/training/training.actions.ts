import { Action } from "@ngrx/store";
import { Exercise } from "./exercise.model";

export const SET_AVAILABLE_TRAININGS = '[TRAIN] SET AVAILABLE TRAININGS';
export const SET_FINISHED_TRAININGS = '[TRAIN] SET FINISHED TRAININGS';
export const SET_START_TRAINING = '[TRAIN] SET START TRAINING';
export const SET_STOP_TRAINING = '[TRAIN] SET STOP TRAINING'

export class SetAvailableTraining implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;
    // these classes have a payload because the available trainings that we set
    // have to be passed along with the acts 
    constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;

    constructor(public payload: Exercise[]) {}
}

export class SetStartTraining implements Action {
    readonly type = SET_START_TRAINING;

    constructor(public payload: String) {}
}

export class SetStopTraining implements Action {
    // do not need a constructor as we have a training payload already in NgRx
    readonly type = SET_STOP_TRAINING;
}

// custom type for 'type'. Allowed in TS
export type TrainingActions =  SetAvailableTraining | SetFinishedTrainings | SetStartTraining | SetStopTraining;