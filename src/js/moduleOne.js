const helloArr = ['Hello World!'];

function moduleOne(x, y) {
  const lo = 17;
  const test = `test in ${lo}`;
  console.log(test);

  return x * y;
}

module.exports = helloArr;
module.exports = {
  moduleOne
};