export class CircularBuffer<T> {
  private bufferSize: number;
  private buffer: T[];
  private nextReadPosition: number;
  private nextWritePosition: number;

  constructor(maxAmountOfItemsToStore: number) {
    maxAmountOfItemsToStore = Math.floor(maxAmountOfItemsToStore);
    if (maxAmountOfItemsToStore < 1) {
      throw new Error(`Wrong maximum amount of items to store: `
        + `${maxAmountOfItemsToStore}. Should be greater than 0`);
    }

    this.bufferSize = maxAmountOfItemsToStore + 1;
    this.buffer = new Array(this.bufferSize);
    this.nextReadPosition = 0;
    this.nextWritePosition = 0;
  }

  getCurrentSize(): number {
    const delta = this.nextWritePosition - this.nextReadPosition;
    return delta < 0 ? delta + this.bufferSize : delta;
  }

  isEmpty(): boolean {
    return this.getCurrentSize() === 0;
  }

  write(item: T): void {
    this.buffer[this.nextWritePosition] = item;
    this.nextWritePosition = this.increasePosition(this.nextWritePosition);
    if (this.isEmpty()) {
      this.nextReadPosition = this.increasePosition(this.nextReadPosition);
    }
  }

  read(): T {
    if (this.isEmpty()) {
      throw new Error('Failed to read from empty buffer');
    }

    const result = this.buffer[this.nextReadPosition];
    this.nextReadPosition = this.increasePosition(this.nextReadPosition);
    return result;
  }

  *readSeveral(maxAmountToRead: number): Generator<T, void> {
    while (!this.isEmpty() && maxAmountToRead-- > 0) {
      yield this.read();
    }
  }

  *readAll(): Generator<T, void> {
    yield *this.readSeveral(this.bufferSize);
  }

  private increasePosition(position: number): number {
    if (++position === this.bufferSize) {
      return 0;
    }
    return position;
  }
}
