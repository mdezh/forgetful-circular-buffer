import { CircularBuffer } from '../src';

describe('testing CircularBuffer instance', () => {
  it('shall create instance successfully', () => {
    expect(() => new CircularBuffer(10)).not.toThrow();
  });

  it('shall throw if max number of elements is lesser than 1', () => {
    expect(() => new CircularBuffer(0)).toThrow();
  });

  it('shall work properly with write() and isEmpty()', () => {
    const buffer = new CircularBuffer<number>(10);
    expect(buffer.isEmpty()).toBeTruthy();
    buffer.write(0);
    expect(buffer.isEmpty()).toBeFalsy();
  });

  it('shall work properly with write() and getCurrentSize()', () => {
    const buffer = new CircularBuffer<number>(10);
    expect(buffer.getCurrentSize()).toBe(0);
    buffer.write(0);
    expect(buffer.getCurrentSize()).toBe(1);
    buffer.write(0);
    expect(buffer.getCurrentSize()).toBe(2);
  });

  it('shall work properly with getCurrentSize() when number of elements is more than max', () => {
    const buffer = new CircularBuffer<number>(3);
    buffer.write(0);
    buffer.write(0);
    buffer.write(0);
    buffer.write(0);
    expect(buffer.getCurrentSize()).toBe(3);
  });

  it('shall throw when read from empty buffer', () => {
    expect(() => {
      const buffer = new CircularBuffer(10);
      return buffer.read();
    }).toThrow();
  });

  it('shall read items from buffer one by one', () => {
    const buffer = new CircularBuffer(10);
    buffer.write(1);
    buffer.write(2);
    expect(buffer.read()).toBe(1);
    expect(buffer.read()).toBe(2);
    expect(() => buffer.read()).toThrow();
  });

  it('shall read requested number of items by *readSeveral()', () => {
    const buffer = new CircularBuffer(10);
    buffer.write(1);
    buffer.write(2);
    buffer.write(3);
    expect([...buffer.readSeveral(2)]).toEqual([1, 2]);
  });

  it('shall read all items by *readSeveral() if requested number is more than current size', () => {
    const buffer = new CircularBuffer(10);
    buffer.write(1);
    buffer.write(2);
    buffer.write(3);
    expect([...buffer.readSeveral(20)]).toEqual([1, 2, 3]);
  });

  it('shall read all items by *readAll()', () => {
    const buffer = new CircularBuffer(10);
    buffer.write(1);
    buffer.write(2);
    buffer.write(3);
    buffer.read();
    expect([...buffer.readAll()]).toEqual([2, 3]);
  });

  it('shall forget old elements if number of new ones is more than max size', () => {
    const buffer = new CircularBuffer(3);
    buffer.write(1);
    buffer.write(2);
    buffer.write(3);
    buffer.write(4);
    buffer.write(5);
    expect([...buffer.readAll()]).toEqual([3, 4, 5]);
  });
});
