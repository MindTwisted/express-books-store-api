import JsonView from '@views/JsonView';
import GenreRepository from '@repositories/GenreRepository';
import BookRepository from '@repositories/BookRepository';
import ControllerInterface from '@interfaces/ControllerInterface';
import Genre from '@models/Genre';
import Book from '@models/Book';

class GenreController implements ControllerInterface {
    /**
     * Get all genres
     *
     * @param req
     * @param res
     * @param next
     */
    public async index(req: any, res: any, next: Function) {
        try {
            const genres: Genre[] = await GenreRepository.findAll(req.query);

            JsonView.render(res, { code: 200, data: { genres } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get genre by id
     *
     * @param req
     * @param res
     * @param next
     */
    public async show(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.findOneById(req.params.id);

            JsonView.render(res, { code: 200, data: { genre } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get books by genre id
     *
     * @param req
     * @param res
     * @param next
     */
    public async showBooks(req: any, res: any, next: Function) {
        try {
            const books: Book[] = await BookRepository.findAll({
                genres: req.params.id,
                ...req.query,
            });

            JsonView.render(res, { code: 200, data: { books } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create new genre
     *
     * @param req
     * @param res
     * @param next
     */
    public async store(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.create(req.body);

            JsonView.render(res, { code: 200, text: 'Genre was successfully created.', data: { genre } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update genre
     *
     * @param req
     * @param res
     * @param next
     */
    public async update(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.update({ ...req.params, ...req.body });

            JsonView.render(res, { code: 200, text: 'Genre was successfully updated.', data: { genre } });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete genre
     *
     * @param req
     * @param res
     * @param next
     */
    public async destroy(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.delete(req.params);

            JsonView.render(res, { code: 200, text: `Genre with id ${genre.id} was successfully deleted.` });
        } catch (error) {
            next(error);
        }
    }
}

export default new GenreController();
