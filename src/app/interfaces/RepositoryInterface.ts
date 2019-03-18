import Bluebird from 'bluebird';

interface RepositoryInterface {
    findAll(data: any): Bluebird<any>;
    findOneById(id: number): Bluebird<any>;
    findOne(data: any): Bluebird<any>;
    create(data: any): Bluebird<any>;
    update(data: any): Bluebird<any>;
    delete(data: any): Bluebird<any>;
};

export default RepositoryInterface;