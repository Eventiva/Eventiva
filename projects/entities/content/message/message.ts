
export type PlainMessage = {
  name: string;
}

export class Message {
  constructor(
    /**
     * name of the instance
     */
    readonly name: string
  ) {}

  /**
   * serialize a Message into
   * a serializable object.
   */
  toObject() {
    return {
      name: this.name
    };
  }

  /**
   * create a Message object from a 
   * plain object.
   */
  static from(plainMessage: PlainMessage) {
    return new Message(
      plainMessage.name
    );
  }
}
