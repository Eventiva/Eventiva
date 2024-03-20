
import { Column as PlainColumn } from '@eventiva/central.aspects.database'

/**
 * Exports the generated Document type for use within other components
 *
 * @export
 * @class Document
 * @typedef {Document}
 * @implements {User}
 */
export { PlainColumn }

export class Column implements PlainColumn {
  constructor(
    readonly id: string,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
    private _deletedAt: Date | null = null
  ) {}

  /**
   * Returns the value of the 'createdAt' property.
   *
   * @public
   * @readonly
   * @type {Date}
   */
  public get createdAt() {
    return this._createdAt
  }

  /**
   * Returns the value of the updatedAt property.
   *
   * @public
   * @readonly
   * @type {Date}
   */
  public get updatedAt() {
    return this._updatedAt
  }

  /**
   * Returns the value of the deletedAt property.
   *
   * @public
   * @readonly
   * @type {Date}
   */
  public get deletedAt() {
    return this._deletedAt
  }

  /**
   * Creates and returns a PlainColumn object with the properties id, createdAt, updatedAt, and deletedAt copied from the current object instance.
   *
   * @returns {PlainColumn} Returns a PlainColumn object with the properties 'id', 'createdAt', 'updatedAt', and 'deletedAt' based on the current object's properties.
   */
  toObject() {
    const returnable: PlainColumn = {
      id: this.id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt
    }
    return returnable
  }

  /**
   * Creates a new Column object based on the provided PlainColumn object.
   *
   * @static
   * @param {PlainColumn} plainColumn A plain user object
   * @returns {Column} Creates a new Column object from a PlainColumn object
   */
  static from(plainColumn: PlainColumn) {
    return new Column(
      plainColumn.id
    );
  }
}
