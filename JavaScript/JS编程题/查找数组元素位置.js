function indexOf(arr, item) {
  for(let i = 0; i < arr.length; i++) {
      if(arr[i] === item) {
          return i;
      } else {
          continue;
      }
  }
  return -1;
}

function demo() {
    console.log('转换后的 arguments 对象：', [...arguments])
}

demo(1, 2, 3, 4)