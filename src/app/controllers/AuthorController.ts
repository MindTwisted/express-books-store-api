import View from '@views/index';
import AuthorRepository from '@repositories/AuthorRepository';
import ControllerInterface from '@interfaces/ControllerInterface';
import {Author} from '@models/Author';

class AuthorController implements ControllerInterface {

    /**
     * Get all authors
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    index(req: any, res: any, next: Function): void {
        AuthorRepository.findAll({
                offset: req.query.offset    
            })
            .then((authors: Author[]) => {
                const data = {
                    authors
                };

                res.status(200).send(View.generate(null, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Get author by id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    show(req: any, res: any, next: Function): void {
        AuthorRepository.findOneById(req.params.id)
            .then((author: Author) => {
                const data = {
                    author
                };

                res.status(200).send(View.generate(null, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Create new author
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    store(req: any, res: any, next: Function): void {
        AuthorRepository.create({
                name: req.body.name    
            })
            .then((author: Author) => {
                const text = 'Author was successfully created.';
                const data = {
                    author
                };

                res.status(200).send(View.generate(text, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Update author
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req: any, res: any, next: Function): void {
        AuthorRepository.update({
                id: req.params.id,
                name: req.body.name    
            })
            .then((author: Author) => {
                const text = 'Author was successfully updated.';
                const data = {
                    author
                };

                res.status(200).send(View.generate(text, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Delete author
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    destroy(req: any, res: any, next: Function): void {
        AuthorRepository.delete({
                id: req.params.id    
            })
            .then((author: Author) => {
                const text = `Author with id ${author.id} was successfully deleted.`;

                res.status(200).send(View.generate(text));
            })
            .catch(error => {
                next(error);
            });
    }

}

export default new AuthorController();