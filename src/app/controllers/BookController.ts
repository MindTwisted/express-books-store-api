import JsonView from '@views/JsonView';
import BookRepository from '@repositories/BookRepository';
import ControllerInterface from '@interfaces/ControllerInterface';
import Book from '@models/Book';

class BookController implements ControllerInterface {
    /**
     * Get all books
     *
     * @param req
     * @param res
     * @param next
     */
    public async index(req: any, res: any, next: Function) {
        try {
            const books: Book[] = await BookRepository.findAll(req.query);

            JsonView.render(res, { code: 200, data: { books } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get book by id
     *
     * @param req
     * @param res
     * @param next
     */
    public async show(req: any, res: any, next: Function) {
        try {
            const book: Book = await BookRepository.findOneById(req.params.id);

            JsonView.render(res, { code: 200, data: { book } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create new book
     *
     * @param req
     * @param res
     * @param next
     */
    public async store(req: any, res: any, next: Function) {
        try {
            const book: Book = await BookRepository.create(req.body);

            JsonView.render(res, { code: 200, text: 'Book was successfully created.', data: { book } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update book
     *
     * @param req
     * @param res
     * @param next
     */
    public update(req: any, res: any, next: Function) {}

    /**
     * Delete book
     *
     * @param req
     * @param res
     * @param next
     */
    public destroy(req: any, res: any, next: Function) {}
}

export default new BookController();
