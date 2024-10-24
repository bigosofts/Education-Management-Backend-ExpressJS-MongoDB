// const mongoose = require("mongoose");

// //one to many relationship

// // Author schema

// const authorSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   address: { type: Schema.Types.ObjectId, ref: "Address" }, // One-to-one relationship with Address
// });

// const addressSchema = new mongoose.Schema({
//   street: String,
//   city: String,
//   country: String,
//   postalCode: String,
//   author: { type: Schema.Types.ObjectId, ref: "Author" }, // One-to-one relationship with Author
// });

// // Middleware: Before saving a book, update the author's book list
// addressSchema.pre("save", async function (next) {
//   const address = this; // 'this' refers to the book being saved
//   const author = await mongoose.model("Author").findById(address.author);

//   if (author) {
//     author.address = address._id;
//     await author.save(); // Save the updated author document
//   }

//   next();
// });

// //one to many relationship

// //suppose Author have many books

// // Define Author Schema
// const authorSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   books: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Book", // Array of references to Book model
//     },
//   ],
// });

// // Define Book Schema
// const bookSchema = new mongoose.Schema({
//   title: String,
//   publishedYear: Number,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Author", // Reference to Author model
//   },
// });

// // Middleware: Before saving a book, update the author's book list
// bookSchema.pre("save", async function (next) {
//   const book = this; // 'this' refers to the book being saved
//   const author = await mongoose.model("Author").findById(book.author);

//   if (author) {
//     author.books.push(book._id);
//     await author.save(); // Save the updated author document
//   }

//   next();
// });

// bookSchema.pre("remove", async function (next) {
//   const book = this; // 'this' refers to the book being removed
//   const author = await mongoose.model("Author").findById(book.author);

//   if (author) {
//     // Remove the book's _id from the author's books array
//     author.books.pull(book._id);
//     await author.save(); // Save the updated author document
//   }

//   next();
// });

// // Create the models
// const Author = mongoose.model("Author", authorSchema);
// const Book = mongoose.model("Book", bookSchema);
// const Address = mongoose.model("Address", addressSchema);

// //populate

// const populatedAuthor = await Author.findById(newAuthor._id).populate("books");
// console.log("Populated Author with Books:", populatedAuthor);

// // {
// //     "_id": "651f9a5c21ab7a001de9b5d6",
// //     "name": "John Doe",
// //     "age": 45,
// //     "books": [
// //       {
// //         "_id": "651f9a6f21ab7a001de9b5d7",
// //         "title": "Intro to Programming",
// //         "publishedYear": 2010,
// //         "author": "651f9a5c21ab7a001de9b5d6"
// //       },
// //       {
// //         "_id": "651f9a7d21ab7a001de9b5d8",
// //         "title": "Advanced JavaScript",
// //         "publishedYear": 2015,
// //         "author": "651f9a5c21ab7a001de9b5d6"
// //       }
// //     ],
// //     "__v": 2
// //   }

// //polymorphism example

// async function createSampleData() {
//   // Create a BlogPost
//   const blogPost = new BlogPost({
//     title: "Understanding Polymorphic Relationships",
//     content: "Polymorphic relationships allow flexibility in referencing.",
//   });
//   await blogPost.save();

//   // Create a Photo
//   const photo = new Photo({
//     title: "Beautiful Sunset",
//     url: "https://example.com/sunset.jpg",
//   });
//   await photo.save();

//   // Create Comments
//   const comment1 = new Comment({
//     content: "Great post!",
//     commentableId: blogPost._id,
//     commentableType: "BlogPost",
//   });
//   await comment1.save();

//   const comment2 = new Comment({
//     content: "Stunning photo!",
//     commentableId: photo._id,
//     commentableType: "Photo",
//   });
//   await comment2.save();

//   console.log("Sample data created!");
// }

// createSampleData();

// //many to many examples

// const mongoose = require("mongoose");

// // Student Schema
// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
// });

// // Middleware: Before saving a student, update the course's student list
// studentSchema.pre("save", async function (next) {
//   const student = this;

//   // Add each course to the respective students in the course documents
//   for (const courseId of student.courses) {
//     const course = await mongoose.model("Course").findById(courseId);
//     if (course) {
//       if (!course.students.includes(student._id)) {
//         course.students.push(student._id);
//         await course.save(); // Save the updated course document
//       }
//     }
//   }
//   next();
// });

// // Middleware: Before removing a student, update the course's student list
// studentSchema.pre("remove", async function (next) {
//   const student = this;

//   // Remove this student from each course's student list
//   for (const courseId of student.courses) {
//     const course = await mongoose.model("Course").findById(courseId);
//     if (course) {
//       course.students.pull(student._id);
//       await course.save(); // Save the updated course document
//     }
//   }
//   next();
// });

// // Course Schema
// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
// });

// // Middleware: Before saving a course, update the students' course list
// courseSchema.pre("save", async function (next) {
//   const course = this;

//   // Add this course to the respective students in the student documents
//   for (const studentId of course.students) {
//     const student = await mongoose.model("Student").findById(studentId);
//     if (student) {
//       if (!student.courses.includes(course._id)) {
//         student.courses.push(course._id);
//         await student.save(); // Save the updated student document
//       }
//     }
//   }
//   next();
// });

// // Middleware: Before removing a course, update the students' course list
// courseSchema.pre("remove", async function (next) {
//   const course = this;

//   // Remove this course from each student's course list
//   for (const studentId of course.students) {
//     const student = await mongoose.model("Student").findById(studentId);
//     if (student) {
//       student.courses.pull(course._id);
//       await student.save(); // Save the updated student document
//     }
//   }
//   next();
// });

// // Create models
// const Student = mongoose.model("Student", studentSchema);
// const Course = mongoose.model("Course", courseSchema);
