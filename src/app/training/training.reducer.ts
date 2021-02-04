import { Exercise } from "./exercise.model";
import { 
    SET_AVAILABLE_TRAININGS, 
    SET_FINISHED_TRAININGS, 
    SET_START_TRAINING, 
    SET_STOP_TRAINING, 
    TrainingActions 
} from "./training.actions";
import * as fromRoot from '../app.reducer';

export interface TrainingState {
    availableExercises: Exercise[],
    finishedExercises: Exercise[],
    activeExercise: Exercise
};

export interface State extends fromRoot.State {
    trainingState: TrainingState;
};

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeExercise: null
};

export function authReducer(state = initialState, action: TrainingActions) {
    // action must always be an object with 'type' property
    switch(action.type) {
        case SET_AVAILABLE_TRAININGS:
            return  {
                ...state,
                availableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case SET_START_TRAINING:
            return {
                ...state,
                activeExercise: action.payload
            };
        case SET_STOP_TRAINING:
            return {
                ...state,
                activeExercise: null
            };
            
        default:
            return state;
    }
}

export const getAvailableExercises = (state: TrainingState) => (state.availableExercises);
export const getFinishedExercises = (state: TrainingState) => (state.finishedExercises);
export const getTrainingExercises = (state: TrainingState) => (state.activeExercise);