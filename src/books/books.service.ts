import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Request } from 'express'; 

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookModel.create(createBookDto);
  }

  async findAll(request: Request): Promise<Book[]> { 
    return await this.bookModel
      .find(request.query) 
      .populate({ path: 'comments.username' })
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }

  async findOne(id: string): Promise<Book | null> {
    return await this.bookModel
      .findById(id)
      .populate({ path: 'comments.username' }) 
      .exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
    return await this.bookModel.findOneAndUpdate({ _id: id }, updateBookDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.bookModel.findByIdAndDelete({ _id: id }).exec();
  }

  async addComment(id: string, comment: any) { 
    let book: BookDocument | null = await this.bookModel.findById(id); 
    if (book != null) {
      book.comments.push(comment); 
      await book.save();    
    } 
    return book;
  }
}