import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NotesService } from './services/notes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// for material component animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// for material toolbar
import { MatToolbarModule } from '@angular/material/toolbar';

// for mat expansion panel
import { MatExpansionModule } from '@angular/material/expansion';

// for mat form field
import { MatFormFieldModule } from '@angular/material/form-field';

// for matInput
import { MatInputModule } from '@angular/material/input';

// for mat button
import { MatButtonModule } from '@angular/material/button';

// for ngModel
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// for mat card
import { MatCardModule } from '@angular/material/card';

// for HttpClient
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';

import { MatDialogModule } from '@angular/material/dialog';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
// For mat-select
import { MatSelectModule } from '@angular/material/select';
import { RouterService } from './services/router.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'view/note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    MatSelectModule
  ],
  providers: [NotesService, AuthenticationService, CanActivateRouteGuard, RouterService],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]

})
export class AppModule { }
