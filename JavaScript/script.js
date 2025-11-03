// // console.log('JavaScript file loaded successfully!');
// // //object create
// // let rectangle = {
// //     length: 10,
// //     breadth: 5,
// //     draw: function() {
// //         console.log('Drawing rectangle with length: ' + this.length + ' and breadth: ' + this.breadth);
// //     }
// // };  

// //facctory function
// function createRectangle(length, breadth) {
//     return {
//         length: length,
//         breadth: breadth,
//         draw: function() {
//             console.log('Drawing rectangle with length: ' + this.length + ' and breadth: ' + this.breadth);
//         }
//     };
// }
// // Using the factory function to create a rectangle object
// let rectangle1 = createRectangle(10, 5);
// let rectangle2 = createRectangle(20, 15);
// // Calling the draw method on the rectangle object
// rectangle1.draw();
// rectangle2.draw();
// // console.log(rectangle1);
// // console.log(rectangle2);


// // // Constructor function
// //constructor function -> Pascal Notation -> first letter of each word is capitalized -> NumberOfStudents
// function Rectangle(length, breadth) {
//     this.length = length;
//     this.breadth = breadth;
//     this.draw = function() {
//         console.log('Drawing rectangle with length: ' + this.length + ' and breadth: ' + this.breadth);
//     };
// }
// // Using the constructor function to create a rectangle object
// let rectangle3 = new Rectangle(30, 20);
// let rectangle4 = new Rectangle(40, 25);
// // Calling the draw method on the rectangle object
// rectangle3.draw();
// rectangle4.draw();

// rectangle3.color = 'red'; // Adding a new property to the rectangle object
// console.log(rectangle3.color); 
// console.log(rectangle3);// Accessing the new property

//object - colone #1
let src = {
    a: 10,
    b: 20,
    c: 30
};
let dest = {};
for(let key in src) {
    dest[key] = src[key];
}
console.log(dest); // { a: 10, b: 20, c: 30 }

src.a++;
console.log(dest); // { a: 10, b: 20, c: 30 } - dest remains unchanged
console.log(src); // { a: 11, b: 20, c: 30 } - src is updated

//object - colone #2
let src2 = {
    a: 10,
    b: 20,
    c: 30
};
let dest2 = Object.assign({}, src2);
console.log(dest2); // { a: 10, b: 20, c: 30 }
src2.a++;
console.log(dest2); // { a: 10, b: 20, c: 30 } - dest2 remains unchanged
console.log(src2); // { a: 11, b: 20, c: 30 } - src2 is updated

//object - colone #3
let src3 = {
    a: 10,
    b: 20,
    c: 30
};  
let dest3 = { ...src3 };
console.log(dest3); // { a: 10, b: 20, c: 30 }
src3.a++;
console.log(dest3); // { a: 10, b: 20, c: 30 } - dest3 remains unchanged
console.log(src3); // { a: 11, b: 20, c: 30 } - src3 is updated

