import {Sequelize} from 'sequelize-typescript';
import {Author} from '@models/Author';
import {Genre} from '@models/Genre';
import {Book} from '@models/Book';
import {BookAuthor} from '@models/BookAuthor';
import {BookGenre} from '@models/BookGenre';
import {User} from '@models/User';

export const init = () => {
    const env = process.env.NODE_ENV || 'development';
    const config = require('@root/database/config.json')[env];
    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    sequelize.addModels([Author, Genre, Book, BookAuthor, BookGenre, User]);
}