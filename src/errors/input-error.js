export default class InputError extends Error {
  constructor(message, object) {
    super(message);
    this.objectString = JSON.stringify(object);
    this.name = 'InputError';
    this.message = `${message}\n${this.objectString}`;
  }
}
