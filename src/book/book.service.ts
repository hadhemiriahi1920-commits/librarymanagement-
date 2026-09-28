import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { title } from 'process';
import { Book } from './entities/book.entity.js';

@Injectable()
export class BookService {
  private books:Book[]=[{id:1,title:"test",price:350,createdAt:new Date(),updateAt:new Date()}]
  create(createBookDto: CreateBookDto) {
    if(!createBookDto){
      throw new BadGatewayException('verifier votre data')
    }
    const lastbook=this.books[this.books.length-1];
    const nextId:number = lastbook ? lastbook.id + 1 : 1;
    const newBook: Book = { ...createBookDto, id: nextId, createdAt: new Date(), updateAt: new Date() };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new BadGatewayException('Book not found');
    }
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
