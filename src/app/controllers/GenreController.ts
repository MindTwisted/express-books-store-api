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
    index(req: any, res: any, next: Function): void {
        GenreRepository.findAll({
                offset: req.query.offset    
            })
            .then((genres: Genre[]) => {
                const data = {
                    genres
                };

                res.status(200).send(View.generate(null, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Get genre by id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    show(req: any, res: any, next: Function): void {
        GenreRepository.findOne({
                id: req.params.id    
            })
            .then((genre: Genre) => {
                const data = {
                    genre
                };

                res.status(200).send(View.generate(null, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Create new genre
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    store(req: any, res: any, next: Function): void {
        GenreRepository.create({
                name: req.body.name    
            })
            .then((genre: Genre) => {
                const text = 'Genre was successfully created.';
                const data = {
                    genre
                };

                res.status(200).send(View.generate(text, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Update genre
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req: any, res: any, next: Function): void {
        GenreRepository.update({
                id: req.params.id,
                name: req.body.name    
            })
            .then((genre: Genre) => {
                const text = 'Genre was successfully updated.';
                const data = {
                    genre
                };

                res.status(200).send(View.generate(text, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Delete genre
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    destroy(req: any, res: any, next: Function): void {
        GenreRepository.delete({
                id: req.params.id    
            })
            .then((genre: Genre) => {
                const text = `Genre with id ${genre.id} was successfully deleted.`;

                res.status(200).send(View.generate(text));
            })
            .catch(error => {
                next(error);
            });
    }

}

export default new GenreController();