# Circular buffer
A simple forgetful circular buffer (or circular queue) in TypeScript
- Tiny and lightweight
- Dependency-free

# Usage
``` TypeScript
import { CircularBuffer } from "forgetful-circular-buffer";

const buffer = new CircularBuffer<number>(5);

console.log(buffer.isEmpty());
// true

buffer.write(1);
buffer.write(2);
buffer.write(3);

console.log(buffer.getCurrentSize());
// 3

console.log(buffer.read());
// 1

for (const item of buffer.readAll()) {
  console.log(item);
}
// 2, 3
```

Also see [the example](examples/example.ts)
