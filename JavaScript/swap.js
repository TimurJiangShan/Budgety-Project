/*
  1. 临时变量法
  2. 加减法
  3. 数组法
  4. 对象法
*/

/* 2. 加减法 */

var a = 3;
var b = 5;
a = a + b;
b = a - b;
a = a - b;

/* 3. 数组法 */


var a = 3;
var b = 5;
a = [a, b];
b = a[0];
a = a[1]

/* 4. 对象法 */

var a = 3;
var b = 5;
a = { a: b, b: a};
b = a.b;
a = a.a;
