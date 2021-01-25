import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { MaterialModule } from "../material/material.module";

import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingComponent } from "./training.component";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        AngularFirestoreModule,
        FormsModule
    ],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}