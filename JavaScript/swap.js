/*
  1. 临时变量法
  2. 加减法
  3. 数组法
  4. 对象法
  5. 数组运算法
  6. 按位异或
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


/* 5. 数组运算法 */

var a = 3;
var b = 5;
a = [b, b = a][0];

/* 6. 按位异或 */

var a = 3;
var b = 5;
a = a^b;
b = b^a;
a = a^b;