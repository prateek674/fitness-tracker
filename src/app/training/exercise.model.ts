export interface Exercise {
    id: String;
    name: String;
    duration: number;
    calories: number;
    // ? means optional
    date?: Date;
    // state has any of these three values
    state?: 'completed' | 'cancelled' | null;
}