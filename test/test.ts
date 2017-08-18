import file from '../'

async function test() {
    console.log(Object.getOwnPropertyNames(file));
    let data = await file.readAllText('./test/test.js');
    console.log(data);
}

test();

