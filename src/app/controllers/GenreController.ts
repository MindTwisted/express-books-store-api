import View from '@views/index';
import GenreRepository from '@repositories/GenreRepository';
import ControllerInterface from '@interfaces/ControllerInterface';
import {Genre} from '@models/Genre';

class GenreController implements ControllerInterface {

    /**
     * Get all genres
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    async index(req: any, res: any, next: Function) {
        try {
            const genres: Genre[] = await GenreRepository.findAll(req.query);

            res.status(200).send(View.generate(null, {genres}));
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
    async show(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.findOneById(req.params.id);

            res.status(200).send(View.generate(null, {genre}));
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
    async store(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.create(req.body);

            res.status(200).send(View.generate('Genre was successfully created.', {genre}));
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
    async update(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.update({...req.params, ...req.body});

            res.status(200).send(View.generate('Genre was successfully updated.', {genre}));
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
    async destroy(req: any, res: any, next: Function) {
        try {
            const genre: Genre = await GenreRepository.delete(req.params);

            res.status(200).send(View.generate(`Genre with id ${genre.id} was successfully deleted.`));
        } catch (error) {
            next(error);
        }
    }

}

export default new GenreController();