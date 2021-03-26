# FitnessTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

## Implementation
As part of this project, the following was implemented-
* Used **Angular Materials** for the UI components of the application.
* Used **FlexLayoutModule** for the flex layout implementation in the signup and login form pages.
* Used custom routes within the application using **Routes** and **RouterModule** for navigation.
* Used **FormsModule** for **template driven forms** implementation for the signup form along with validations, hints and error prompts using mat-hint and mat-error. Bound the entered data using ngModel.
* Used **MatSidenavModule** for the side navigation implementation.
* Used **MatToolbarModule** for the toolbar implementation (comes with Flex). Used the flex layout properties to make the toolbar part of the **responsive** webpage design.
* Used **EventEmitter** to listen to custom events between components.
* Implemented tabs within a page using **MatTabsModule** for an intuitive web design.
* Used **MatCardModule** to show the exercise options within cards.
* Used **MatSelectModule** for drop down feature implementation for the selection of exercise options available.
* Implemented a determinate progress spinner using **MatProgressSpinnerModule** to show the progress of the exercise of the user.
* Implemented dialog prompt in a separate module with **@Inject** decorator with **MAT_DIALOG_DATA** to inject information from one component to another.
* Implemented routing **guard service** for protecting some routes from unauthenticated users, using CanActivate, ActivatedRouterSnapshot and RouterStateSnapshot.
* Used MatTableModule to display the history of exercises performed by the user. Implemented **Pagination** (with MatPaginatorModule), **Sorting** (with MatSortModule) and **Filtering** (by accessing the DOM event) on that data. Made these updates in the AfterViewInit life cycle hook.
* Used **Firebase** for the database with AngularFireModule and AngularFirestoreModule from Angularfire2 library, to connect the Angular application to the Firebase database.
* Used **AngularFireAuth** for the authentication feature.
* Used and handled **Observables** for the asynchronous sections of the application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
