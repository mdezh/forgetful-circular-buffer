export class CircularBuffer<T> {
  private _bufferSize: number;
  private _buffer: T[];
  private _nextReadPosition: number;
  private _nextWritePosition: number;

  constructor(maxAmountOfItemsToStore: number) {
    const maxAmountOfItemsTruncated = Math.floor(maxAmountOfItemsToStore);
    if (maxAmountOfItemsTruncated < 1) {
      throw new Error(
        `Wrong maximum amount of items to store: ` +
          `${maxAmountOfItemsTruncated}. Should be greater than 0`
      );
    }

    this._bufferSize = maxAmountOfItemsTruncated + 1;
    this._buffer = new Array(this._bufferSize);
    this._nextReadPosition = 0;
    this._nextWritePosition = 0;
  }

  getCurrentSize(): number {
    const delta = this._nextWritePosition - this._nextReadPosition;
    return delta < 0 ? delta + this._bufferSize : delta;
  }

  isEmpty(): boolean {
    return this.getCurrentSize() === 0;
  }

  write(item: T): void {
    this._buffer[this._nextWritePosition] = item;
    this._nextWritePosition = this._increasePosition(this._nextWritePosition);
    if (this.isEmpty()) {
      this._nextReadPosition = this._increasePosition(this._nextReadPosition);
    }
  }

  read(): T {
    if (this.isEmpty()) {
      throw new Error('Failed to read from empty buffer');
    }

    const result = this._buffer[this._nextReadPosition];
    this._nextReadPosition = this._increasePosition(this._nextReadPosition);
    return result;
  }

  *readSeveral(maxAmountToRead: number): Generator<T, void> {
    let counter = 0;
    while (!this.isEmpty() && counter++ < maxAmountToRead) {
      yield this.read();
    }
  }

  *readAll(): Generator<T, void> {
    yield* this.readSeveral(this._bufferSize);
  }

  private _increasePosition(position: number): number {
    const increasedPosition = position + 1;
    return increasedPosition < this._bufferSize ? increasedPosition : 0;
  }
}

export default CircularBuffer;
