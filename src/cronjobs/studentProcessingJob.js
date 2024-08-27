const cron = require("node-cron");
const studentProfileModel = require("../models/studentProfileModel"); // Assuming this is your model
const paymentModel = require("../models/paymentModel"); // Assuming this is your model

const studentProfileActiveModel = require("../models/activeStudentProfileModel");
const studentProfileDueModel = require("../models/dueStudentProfileModel");
const studentProfilePendingModel = require("../models/pendingStudentProfileModel");

// Function to process and update student records
function processAllStudents() {
  const processAl = async () => {
    console.log("Running daily student processing job");
    try {
      // Step 1: Clear existing records in the collections
      await studentProfileActiveModel.deleteMany({});
      await studentProfileDueModel.deleteMany({});
      await studentProfilePendingModel.deleteMany({});

      // Step 2: Fetch all students from the main collection
      const allStudents = await studentProfileModel.find({}).exec();

      // Step 3: Process each student and categorize them
      const studentPromises = allStudents.map(async (student) => {
        const paymentResult = await paymentModel.findOne({
          paymentID: student.paymentStatus.paymentID,
        });

        const newStudent = {
          firstName: {
            en: student.firstName.en,
            bn: student.firstName.bn,
          },
          lastName: {
            en: student.lastName.en,
            bn: student.lastName.bn,
          },
          nidNumber: student.nidNumber,
          birthRegNumber: student.birthRegNumber,
          fatherName: {
            en: student.fatherName.en,
            bn: student.fatherName.bn,
          },
          emailAddress: student.emailAddress,

          mobileNumber: student.mobileNumber,
          occupation: student.occupation,
          extracurricular: student.extracurricular,
          studentCourseCode: student.studentCourseCode,
          studentJamatCode: student.studentJamatCode,
          gender: student.gender,
          dateOfBirth: student.dateOfBirth,
          countryName: student.countryName,
          fullPresentAddress: student.fullPresentAddress,
          fullPermanentAddress: student.fullPermanentAddress,
          admissionSession: student.admissionSession,
          studentMotive: student.studentMotive,
          details: student.details,
          paymentStatus: student.paymentStatus,
          activeStatus: student.activeStatus,
          userRole: student.userRole,
          userName: student.userName,
          studentDepartment: student.studentDepartment,
          studentSemester: student.studentSemester,
          batchCount: student.batchCount,
          fundStatus: student.fundStatus,
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
            await studentProfilePendingModel.create(newStudent);
          } else if (decisionActive) {
            await studentProfileActiveModel.create(newStudent);
          } else {
            await studentProfileDueModel.create(newStudent);
          }
        }
      });

      await Promise.all(studentPromises);

      console.log("All students have been processed and categorized.");
    } catch (error) {
      console.error("Error processing students:", error);
    }
  };

  //every day at midnight
  cron.schedule("0 0 * * *", () => {
    processAl();
  });

  //every hour
  // cron.schedule("0 * * * *", () => {
  //   processAl();
  // });
}

// Schedule the job to run every day at midnight
module.exports = processAllStudents;
