import { Sequelize } from 'sequelize-typescript';
import cls from 'continuation-local-storage';
import Author from '@models/Author';
import Genre from '@models/Genre';
import Book from '@models/Book';
import BookAuthor from '@models/BookAuthor';
import BookGenre from '@models/BookGenre';
import User from '@models/User';

/*eslint-disable */
const clsBluebird = require('cls-bluebird');
/*eslint-enable */

const namespace = cls.createNamespace('main-transactions-namespace');

clsBluebird(namespace);

(Sequelize as any).__proto__.useCLS(namespace);

const env = process.env.NODE_ENV || 'development';
const config = require('@root/database/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.addModels([Author, Genre, Book, BookAuthor, BookGenre, User]);

export default sequelize;
