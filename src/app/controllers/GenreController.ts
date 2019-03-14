'use strict';

import View from '@views/index';
import GenreRepository from '@repositories/GenreRepository';
import ControllerInterface from '@interfaces/ControllerInterface';

class GenreController implements ControllerInterface {

    /**
     * Get all genres
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    index(req: any, res: any, next: Function) {
        GenreRepository.findAll({
                offset: req.query.offset    
            })
            .then((genres: any) => {
                const data = {
                    genres
                };

                res.status(200).send(View.generate(null, data));
            }).catch(next);
    }

    /**
     * Get genre by id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    show(req: any, res: any, next: Function) {
        GenreRepository.findOne({
                id: req.params.id    
            })
            .then((genre: any) => {
                const data = {
                    genre
                };

                res.status(200).send(View.generate(null, data));
            }).catch(next);
    }

    /**
     * Create new genre
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    store(req: any, res: any, next: Function) {
        GenreRepository.create({
                name: req.body.name    
            })
            .then((genre: any) => {
                const text = 'Genre was successfully created.';
                const data = {
                    genre
                };

                res.status(200).send(View.generate(text, data));
            }).catch(next);
    }

    /**
     * Update genre
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req: any, res: any, next: Function) {
        GenreRepository.update({
                id: req.params.id,
                name: req.body.name    
            })
            .then((genre: any) => {
                const text = 'Genre was successfully updated.';
                const data = {
                    genre
                };

                res.status(200).send(View.generate(text, data));
            }).catch(next);
    }

    /**
     * Delete genre
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    destroy(req: any, res: any, next: Function) {
        GenreRepository.delete({
                id: req.params.id    
            })
            .then((genre: any) => {
                const text = `Genre with id ${genre.id} was successfully deleted.`;

                res.status(200).send(View.generate(text));
            }).catch(next);
    }

}

export default new GenreController();