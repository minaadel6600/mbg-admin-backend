import HttpError from '../models/error.model';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import IRequest from '../interfaces/i-request';
import { BookRepository } from '../db-repositories/book.repo';


class BookService {
  public bookRepository = new BookRepository();

  public async getPageOfBooks(currentPage: number | 1, pageSize: number | 0, searchKey: string) {

    const searchQuery = { Title: { $regex: '.*' + searchKey + '.*' } }
    const sortQuery = { DownloadsCount: -1 };
    const books = await this.bookRepository.getPage(currentPage, pageSize, searchQuery, sortQuery)


    return books;
  }
  public async getBooksCount() {

    const count = await this.bookRepository.getCount();

    return count;
  }
  public async getDownloadsSum() {
    const res = await this.bookRepository.GetSum("DownloadsCount");

    return res[0].total;
  }

  public async getAllBooksService() {



    const books = await this.bookRepository.getAll()


    return books;
  }

  public async getBookByIdService(req: IRequest, id: string) {
    const book = await this.bookRepository.getById(id);
    if (!book) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    return book;
  }
  public async deleteBookByIdService(req: IRequest, id: string) {
    const book = await this.bookRepository.DeleteById(id);
    if (!book) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    return book;
  }
  public async updateBookService(req: IRequest, bookId: string, data: any) {

    const book = await this.bookRepository.getById(bookId);
    if (!book) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    let updatedBook = await this.bookRepository.UpdateById(bookId, data)
    return updatedBook;
  }
  public async addBookService(bookData: any) {
    const addedBook = await this.bookRepository.Create(bookData);
    return addedBook;
  }
}

export default BookService;
