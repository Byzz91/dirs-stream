const puzzySearch = require('../src/index');

let Stream = new puzzySearch("/Users/byzz/dev/puzzysearch").Stream;

Stream.on('data', (data) => {
  console.log(`Callback Data: ${ data }`);
});

Stream.on('end', () => {
  console.log(`No More Data`);
});