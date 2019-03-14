import View from '@views/index';
import AuthorRepository from '@repositories/AuthorRepository';
import ControllerInterface from '@interfaces/ControllerInterface';

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
            .then((authors: any) => {
                const data = {
                    authors
                };

                res.status(200).send(View.generate(null, data));
            }).catch(next);
    }

    /**
     * Get author by id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    show(req: any, res: any, next: Function): void {
        AuthorRepository.findOne({
                id: req.params.id
            })
            .then((author: any) => {
                const data = {
                    author
                };

                res.status(200).send(View.generate(null, data));
            }).catch(next);
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
            .then((author: any) => {
                const text = 'Author was successfully created.';
                const data = {
                    author
                };

                res.status(200).send(View.generate(text, data));
            }).catch(next);
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
            .then((author: any) => {
                const text = 'Author was successfully updated.';
                const data = {
                    author
                };

                res.status(200).send(View.generate(text, data));
            }).catch(next);
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
            .then((author: any) => {
                const text = `Author with id ${author.id} was successfully deleted.`;

                res.status(200).send(View.generate(text));
            }).catch(next);
    }

}

export default new AuthorController();