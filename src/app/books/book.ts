import { Author } from '../authors/author';

export class Book {
    id?: number;
    title: string;
    authorId: number;
    author?: Author;
    publisher: string;
    publicationDate: Date;
    numberOfPages: number;
}