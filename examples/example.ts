import { CircularBuffer } from "../src";

const buffer = new CircularBuffer<number>(9);

console.log(buffer.isEmpty());
// true

buffer.write(1);
buffer.write(2);

console.log(buffer.getCurrentSize());
// 2

buffer.write(3);
buffer.write(4);
buffer.write(5);
buffer.write(6);
buffer.write(7);
buffer.write(8);
buffer.write(9);
buffer.write(10);

console.log(buffer.getCurrentSize());
// 9 - we created buffer for 9 items only, so the first one is already forgotten

console.log(buffer.read());
// 2 - see previous comment

for (const item of buffer.readSeveral(3)) {
  console.log(item);
}
// 3, 4, 5

for (const item of buffer.readAll()) {
  console.log(item);
}
// 6, 7, 8, 9, 10