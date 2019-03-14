'use strict';

import View from '@views/index';
import BookRepository from '@repositories/BookRepository';
import ControllerInterface from '@interfaces/ControllerInterface';

class BookController implements ControllerInterface {

    /**
     * Get all books
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    index(req: any, res: any, next: Function) {
        const {offset, search, authors, genres} = req.query;

        BookRepository.findAll({
                offset,
                search,
                authors,
                genres    
            })
            .then((books: any) => {
                const data = {
                    books
                };

                res.status(200).send(View.generate(null, data));
            }).catch(next);
    }

    /**
     * Get book by id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    show(req: any, res: any, next: Function) {
        
    }

    /**
     * Create new book
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    store(req: any, res: any, next: Function) {
        
    }

    /**
     * Update book
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req: any, res: any, next: Function) {
        
    }

    /**
     * Delete book
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    destroy(req: any, res: any, next: Function) {
        
    }

}

export default new BookController();