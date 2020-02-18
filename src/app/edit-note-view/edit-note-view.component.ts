import { RouterService } from './../services/router.service';
import { NotesService } from './../services/notes.service';
import { Note } from '../note';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  note: Note = new Note();

  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private routerService: RouterService,
    private authService: AuthenticationService,
    private noteService: NotesService,
    private router: Router,
    private dialog: MatDialogRef<EditNoteViewComponent>) { }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      data => {
        console.log('edit success');
        this.dialog.close();
      },
      editError => {
        console.log(editError);
        if (editError.status === 404) {
          this.errMessage = editError.message;
        } else {
          this.errMessage = editError.error.message;
        }
      });
  }
}
