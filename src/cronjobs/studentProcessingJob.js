const cron = require("node-cron");
const studentProfileModel = require("../models/studentProfileModel"); // Assuming this is your model
const paymentModel = require("../models/paymentModel"); // Assuming this is your model

const activeStudentsModel = require("../models/activeStudentProfileModel");
const duesStudentsModel = require("../models/dueStudentProfileModel");
const pendingStudentsModel = require("../models/pendingStudentProfileModel");

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
    const studentPromises = allStudents.map(async (student) => {
      const paymentResult = await paymentModel.findOne({
        paymentID: student.paymentStatus.paymentID,
      });

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
          await pendingStudentsModel.create(student);
        } else if (decisionActive) {
          await activeStudentsModel.create(student);
        } else {
          await duesStudentsModel.create(student);
        }
      } else {
        await duesStudentsModel.create(student);
      }
    });

    await Promise.all(studentPromises);

    console.log("All students have been processed and categorized.");
  } catch (error) {
    console.error("Error processing students:", error);
  }
}

// Schedule the job to run every day at midnight

await processAllStudents();
