import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import Book from '@models/Book';
import Genre from '@models/Genre';

@Table({
    timestamps: true,
    tableName: 'BookGenre',
})
export default class BookGenre extends Model<BookGenre> {
    @ForeignKey(() => Book)
    @Column
    private bookId!: number;

    @ForeignKey(() => Genre)
    @Column
    private genreId!: number;
}
