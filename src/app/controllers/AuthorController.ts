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
    async index(req: any, res: any, next: Function) {
        try {
            const authors: Author[] = await AuthorRepository.findAll(req.query);

            res.status(200).send(View.generate(null, {authors}));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get author by id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    async show(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.findOneById(req.params.id);

            res.status(200).send(View.generate(null, {author}));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create new author
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    async store(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.create(req.body);

            res.status(200).send(View.generate('Author was successfully created.', {author}));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update author
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    async update(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.update({...req.params, ...req.body});

            res.status(200).send(View.generate('Author was successfully updated.', {author}));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete author
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    async destroy(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.delete(req.params);

            res.status(200).send(View.generate(`Author with id ${author.id} was successfully deleted.`));
        } catch (error) {
            next(error);
        }
    }

}

export default new AuthorController();