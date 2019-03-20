import JsonView from '@views/JsonView';
import BookRepository from '@repositories/BookRepository';
import ControllerInterface from '@interfaces/ControllerInterface';
import { Book } from '@models/Book';

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
    public show(req: any, res: any, next: Function) {}

    /**
     * Create new book
     *
     * @param req
     * @param res
     * @param next
     */
    public store(req: any, res: any, next: Function) {}

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
