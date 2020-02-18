import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  note: Note = new Note();
  notes: Array<Note> = [];
  errMessage: String = '';
  constructor(private noteService: NotesService, private authService: AuthenticationService) { }

  ngOnInit() {
  }


  takeNote() {
    console.log('Taking Note');
    if (this.note.title === '' || this.note.text === '') {
      this.errMessage = 'Title and Text both are required fields';
    } else {
      this.notes.push(this.note);
      // push note to server
      this.noteService.addNote(this.note).subscribe(
        data => {
          console.log(data);

        },
        error => {
          const noteIndex = this.notes.findIndex(note => note.title === this.note.title);
          // removing note as there was error
          this.notes.splice(noteIndex, 1);

          if (error.status === 404) {
            this.errMessage = error.message;
          }
          console.log(error.message);
          this.errMessage = error.message;
        }
      );
      this.note = new Note();
    }
  }
}
