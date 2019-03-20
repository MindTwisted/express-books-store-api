import JsonView from '@views/JsonView';
import AuthorRepository from '@repositories/AuthorRepository';
import ControllerInterface from '@interfaces/ControllerInterface';
import { Author } from '@models/Author';

class AuthorController implements ControllerInterface {
    /**
     * Get all authors
     *
     * @param req
     * @param res
     * @param next
     */
    public async index(req: any, res: any, next: Function) {
        try {
            const authors: Author[] = await AuthorRepository.findAll(req.query);

            JsonView.render(res, { code: 200, data: { authors } });
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
    public async show(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.findOneById(req.params.id);

            JsonView.render(res, { code: 200, data: { author } });
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
    public async store(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.create(req.body);

            JsonView.render(res, { code: 200, text: 'Author was successfully created.', data: { author } });
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
    public async update(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.update({ ...req.params, ...req.body });

            JsonView.render(res, { code: 200, text: 'Author was successfully updated.', data: { author } });
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
    public async destroy(req: any, res: any, next: Function) {
        try {
            const author: Author = await AuthorRepository.delete(req.params);

            JsonView.render(res, { code: 200, text: `Author with id ${author.id} was successfully deleted.` });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthorController();
