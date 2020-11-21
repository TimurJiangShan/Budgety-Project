/*
  1. 临时变量法
  2. 加减法
  3. 数组法
  4. 对象法
  5. 数组运算法
  6. 按位异或
  7. 解构赋值法
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

/* 7. 解构赋值法 */
var a = 3;
var b = 5;
[a, b] = [b, a];


function foo(a,b){
  console.log(b);
  return {
    foo:function(c){
      return foo(c,a);
    }
  }
}
var func3=foo(0).foo(1);
func3.foo(2);
func3.foo(3);




function C(a) {
  if(a) {
    this.a = a;
  }
}

C.prototype.a = 1;

console.log(new C(2).a);