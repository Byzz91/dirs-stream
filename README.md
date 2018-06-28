# dirs-stream

`dirs-stream` is a library that search asynchrous directories reculsively.

# example

```js
const puzzySearch = require('dirs-stream');

let Stream = new puzzySearch("/Users/byzz/dev/").Stream;

Stream.on('data', (data) => {
  console.log(`Callback Data: ${ data }`);
});

Stream.on('end', () => {
  console.log(`No More Data`);
});
```

# Contact

if you have a question or else...

mail to `eyedroot@gmail.com` and `byzz@inven.co.kr`