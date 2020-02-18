import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  errMessage: String ='';
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
  }


  fetchNotesFromServer() {
    return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set(
        'Authorization', `Bearer ${this.authService.getBearerToken()}`
      )
    }).subscribe(
      data => {
        this.notes = data;
        this.notesSubject.next(this.notes);
      },
      error => {
        console.log(error);
        if (error.status === 404) {
          this.errMessage = error.message;
        } else {
          this.errMessage = error.error.message;
        }
      }
    );

  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set(
        'Authorization', `Bearer ${this.authService.getBearerToken()}`
      )
    })
      .pipe(tap(data => {
        this.notes.push(data);
        this.notesSubject.next(this.notes);
      }));

  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set(
        'Authorization', `Bearer ${this.authService.getBearerToken()}`
      )
    })
      .pipe(tap(data => {
        const note = this.notes.find(noteItem => noteItem.id === data.id);
        Object.assign(note, data);
        this.notesSubject.next(this.notes);
      }));
  }


  getNoteById(noteId): Note {
    const note = this.notes.find(note => note.id === noteId);
    return Object.assign({}, note);

  }
}
