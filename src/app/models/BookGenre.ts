import {Model, Column, Table, ForeignKey} from "sequelize-typescript";
import {Book} from "@models/Book";
import {Genre} from "@models/Genre";

@Table({
  timestamps: true,
  tableName: 'BookGenre'
})
export class BookGenre extends Model<BookGenre> {

  @ForeignKey(() => Book)
  @Column
  bookId!: number;

  @ForeignKey(() => Genre)
  @Column
  genreId!: number;
}