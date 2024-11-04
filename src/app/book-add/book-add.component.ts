import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { last } from 'rxjs';
import { Book } from '../model/book';
import { BooklistComponent } from '../booklist/booklist.component';
@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [BooklistComponent,FormsModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css',
  
})
export class BookAddComponent implements OnChanges{
  @Input() lastId=0;
  @Output() newbookcreated = new EventEmitter<Book>();
  @Input() bookToEdit: Book | null = null;
  title = '';
  author = '';
  price = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookToEdit'] && this.bookToEdit) {
      // Pre-fill the form with the book's data when in edit mode
      this.title = this.bookToEdit.title;
      this.author = this.bookToEdit.author;
      this.price = this.bookToEdit.price;
    } else {
      // Reset form fields when there's no book to edit
      this.resetForm();
    }
  }
 
 
  addBook() {
    if (this.bookToEdit) {
      // If editing, emit the book with the same ID
      const editedBook = new Book(this.bookToEdit.id, this.title, this.author, this.price);
      this.newbookcreated.emit(editedBook);
    } else {
      // If adding a new book, emit a new book with a new ID
      const newBook = new Book(this.lastId + 1, this.title, this.author, this.price);
      this.newbookcreated.emit(newBook);
    }
    this.resetForm();

  }

  resetForm() {
    this.title = '';
    this.author = '';
    this.price = 0;
  }
}



