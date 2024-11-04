import { Component,EventEmitter,Output } from '@angular/core';
import { BookAddComponent } from "../book-add/book-add.component";
import { Book } from '../model/book';
@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [BookAddComponent],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent {
  @Output() editBook = new EventEmitter<Book>();

  books = [
    new Book(1, "Atomic Habits", "James Clear", 35),
    new Book(2, "Atomic Habits 2", "James Clear", 35),
    new Book(3, "Atomic Habits 3", "James Clear", 35),
]
action=""
bookToEdit: Book | null = null;

changeAction(action: string) {
  this.action = action;
}
deleteBook(i:number) {
  this.books.splice(i,1);
}


addBook(book: Book) {
  if (this.bookToEdit) {
    // Update the existing book
    const index = this.books.findIndex(b => b.id === this.bookToEdit!.id);
    if (index !== -1) {
      this.books[index] = book;
    }
    this.bookToEdit = null; // Reset bookToEdit after editing
  } else {
    // Add a new book
    this.books = [...this.books, book];
  }
  this.changeAction("");
}
editBookHandler(book: Book) {
  this.bookToEdit = new Book(book.id, book.title, book.author, book.price); // Copy the book object to avoid direct mutation
  this.changeAction('edit');
}
}
