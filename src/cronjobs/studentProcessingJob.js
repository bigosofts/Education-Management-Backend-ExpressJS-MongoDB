// const cron = require("node-cron");
const studentProfileModel = require("../models/studentProfileModel"); // Assuming this is your model
const paymentModel = require("../models/paymentModel"); // Assuming this is your model

const studentProfileActiveModel = require("../models/activeStudentProfileModel");
const studentProfileDueModel = require("../models/dueStudentProfileModel");
const studentProfilePendingModel = require("../models/pendingStudentProfileModel");

const mongoose = require("mongoose");

// Function to process and update student records
async function processAllStudents() {
  console.log("Running daily student processing job");
  try {
    // Step 1: Clear existing records in the collections
    await activeStudentsModel.deleteMany({});
    await duesStudentsModel.deleteMany({});
    await pendingStudentsModel.deleteMany({});

    // Step 2: Fetch all students from the main collection
    const allStudents = await studentProfileModel.find({}).exec();

    // Step 3: Process each student and categorize them
    const studentPromises = allStudents.map(async (student, i) => {
      const paymentResult = await paymentModel.findOne({
        paymentID: student.paymentStatus.paymentID,
      });

      const newStudent = {
        ...student,
        _id: new mongoose.Types.ObjectId(), // Generate a new unique ID
      };

      if (paymentResult) {
        let actualArray = [...paymentResult.monthlyPaymentHistory];
        actualArray.pop();

        let decisionPending = actualArray.some((item) => {
          return item.Price && item.PaymentStatus == false;
        });

        let decisionActive = actualArray.every((item) => {
          return item.PaymentStatus == true;
        });

        if (decisionPending) {
          console.log("Pending" + decisionPending);
          await studentProfilePendingModel.create(newStudent);
        } else if (decisionActive) {
          console.log("Active" + decisionActive);
          await studentProfileActiveModel.create(newStudent);
        } else {
          console.log("Due");
          await studentProfileDueModel.create(newStudent);
        }
      } else {
        console.log("Due");
        await studentProfileDueModel.create(newStudent);
      }

      console.log("done: " + i);
    });

    await Promise.all(studentPromises);

    console.log("All students have been processed and categorized.");
  } catch (error) {
    console.error("Error processing students:", error);
  }
}

// Schedule the job to run every day at midnight

processAllStudents();
