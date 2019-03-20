import Bluebird from 'bluebird';
import { User } from '@models/User';
import RepositoryInterface from '@interfaces/RepositoryInterface';

class UserRepository implements RepositoryInterface {
    /**
     * Query all users from DB
     *
     * @param data
     */
    public findAll(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Query single user from DB by id
     *
     * @param data
     */
    public findOneById(id: number): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Query single user from DB
     *
     * @param data
     */
    public findOne(data: any): Bluebird<any> {
        const email = data.email;

        return User.findOne({
            where: { email },
        });
    }

    /**
     * Store user to DB
     *
     * @param data
     */
    public create(data: any): Bluebird<any> {
        const { name, email, password } = data;

        return User.create({ name, email, password });
    }

    /**
     * Update user in DB
     *
     * @param data
     */
    public update(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Delete user from DB
     *
     * @param data
     */
    public delete(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }
}

export default new UserRepository();
