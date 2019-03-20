import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import { Book } from '@models/Book';
import { Author } from '@models/Author';

@Table({
    timestamps: true,
    tableName: 'BookAuthor',
})
export class BookAuthor extends Model<BookAuthor> {
    @ForeignKey(() => Book)
    @Column
    private bookId!: number;

    @ForeignKey(() => Author)
    @Column
    private authorId!: number;
}
