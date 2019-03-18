import View from '@views/index';
import BookRepository from '@repositories/BookRepository';
import ControllerInterface from '@interfaces/ControllerInterface';
import {Book} from '@models/Book';

class BookController implements ControllerInterface {

    /**
     * Get all books
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    async index(req: any, res: any, next: Function) {
        try {
            const books: Book[] = await BookRepository.findAll(req.query);

            res.status(200).send(View.generate(null, {books}));
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
    show(req: any, res: any, next: Function): void {
        
    }

    /**
     * Create new book
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    store(req: any, res: any, next: Function): void {
        
    }

    /**
     * Update book
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req: any, res: any, next: Function): void {
        
    }

    /**
     * Delete book
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    destroy(req: any, res: any, next: Function): void {
        
    }

}

export default new BookController();