const cron = require("node-cron");
const studentProfileModel = require("../models/studentProfileModel"); // Assuming this is your model
const paymentModel = require("../models/paymentModel"); // Assuming this is your model

const studentProfileActiveModel = require("../models/activeStudentProfileModel");
const studentProfileDueModel = require("../models/dueStudentProfileModel");
const studentProfilePendingModel = require("../models/pendingStudentProfileModel");

const annualDueStudentsModel = require("../models/annualDueStudentsModel");
const annualPendingStudentsModel = require("../models/annualPendingStudentsModel");
const annualActiveStudentsModel = require("../models/annualActiveStudentsModel");
const annualIrregularStudentsModel = require("../models/annualIrregularStudentsModel");

// Function to process and update student records

function processAllStudents() {
  // const processAl = async () => {
  //   console.log("Running daily student processing job");
  //   try {
  //     // Step 1: Clear existing records in the collections
  //     await studentProfileActiveModel.deleteMany({});
  //     await studentProfileDueModel.deleteMany({});
  //     await studentProfilePendingModel.deleteMany({});

  //     // Step 2: Fetch all students from the main collection
  //     const allStudents = await studentProfileModel.find({}).exec();

  //     // Step 3: Process each student and categorize them
  //     const pendingStudents = [];
  //     const activeStudents = [];
  //     const dueStudents = [];

  //     // Process each student and categorize them
  //     for (const student of allStudents) {
  //       const paymentResult = await paymentModel.findOne({
  //         paymentID: student.paymentStatus.paymentID,
  //       });

  //       if (paymentResult && student.accountStatus.status === "regular") {
  //         const newStudent = {
  //           firstName: {
  //             en: student.firstName.en,
  //             bn: student.firstName.bn,
  //           },
  //           lastName: {
  //             en: student.lastName.en,
  //             bn: student.lastName.bn,
  //           },
  //           nidNumber: student.nidNumber,
  //           birthRegNumber: student.birthRegNumber,
  //           fatherName: {
  //             en: student.fatherName.en,
  //             bn: student.fatherName.bn,
  //           },
  //           emailAddress: student.emailAddress,
  //           mobileNumber: student.mobileNumber,
  //           occupation: student.occupation,
  //           extracurricular: student.extracurricular,
  //           studentCourseCode: student.studentCourseCode,
  //           studentJamatCode: student.studentJamatCode,
  //           gender: student.gender,
  //           dateOfBirth: student.dateOfBirth,
  //           countryName: student.countryName,
  //           fullPresentAddress: student.fullPresentAddress,
  //           fullPermanentAddress: student.fullPermanentAddress,
  //           admissionSession: student.admissionSession,
  //           studentMotive: student.studentMotive,
  //           details: student.details,
  //           paymentStatus: student.paymentStatus,
  //           activeStatus: student.activeStatus,
  //           userRole: student.userRole,
  //           userName: student.userName,
  //           studentDepartment: student.studentDepartment,
  //           studentSemester: student.studentSemester,
  //           batchCount: student.batchCount,
  //           fundStatus: student.fundStatus,
  //           accountStatus: student.accountStatus,
  //         };

  //         let actualArray = [...paymentResult.monthlyPaymentHistory];
  //         actualArray.pop(); // Exclude the latest payment (if required)

  //         let decisionPending = actualArray.some((item) => {
  //           return item.Price && item.PaymentStatus === false;
  //         });

  //         let decisionActive = actualArray.every((item) => {
  //           return item.PaymentStatus === true;
  //         });

  //         // Categorize the student based on payment decisions
  //         if (decisionPending) {
  //           pendingStudents.push(newStudent);
  //         } else if (decisionActive) {
  //           activeStudents.push(newStudent);
  //         } else {
  //           dueStudents.push(newStudent);
  //         }
  //       }
  //     }

  //     // Bulk write operations for each category
  //     if (pendingStudents.length > 0) {
  //       await studentProfilePendingModel.insertMany(pendingStudents.reverse());
  //     }

  //     if (activeStudents.length > 0) {
  //       await studentProfileActiveModel.insertMany(activeStudents.reverse());
  //     }

  //     if (dueStudents.length > 0) {
  //       await studentProfileDueModel.insertMany(dueStudents.reverse());
  //     }

  //     console.log("All students have been processed and categorized.");
  //   } catch (error) {
  //     console.error("Error processing students:", error);
  //   }
  // };

  const processAl = async () => {
    console.log("Running daily student processing job");
    try {
      // Step 1: Clear existing records in the collections (no need to wait one after another)
      await Promise.all([
        studentProfileActiveModel.deleteMany({}),
        studentProfileDueModel.deleteMany({}),
        studentProfilePendingModel.deleteMany({}),
      ]);

      // Step 2: Fetch all students and payments in a single query
      const [allStudents, allPayments] = await Promise.all([
        studentProfileModel.find({}).lean().exec(), // Use lean for faster read operations
        paymentModel.find({}).lean().exec(),
      ]);

      // Create a map for payments based on paymentID for O(1) lookups
      const paymentMap = new Map();
      allPayments.forEach((payment) => {
        paymentMap.set(payment.paymentID, payment);
      });

      // Step 3: Initialize arrays for each category
      const pendingStudents = [];
      const activeStudents = [];
      const dueStudents = [];

      // Step 4: Process each student
      allStudents.forEach((student) => {
        const paymentResult = paymentMap.get(student.paymentStatus.paymentID);

        if (paymentResult && student.accountStatus.status === "regular") {
          const newStudent = {
            firstName: student.firstName,
            lastName: student.lastName,
            nidNumber: student.nidNumber,
            birthRegNumber: student.birthRegNumber,
            fatherName: student.fatherName,
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
            accountStatus: student.accountStatus,
          };

          // Remove the latest payment (if needed)
          let actualArray = [...paymentResult.monthlyPaymentHistory];
          actualArray.pop();

          // Determine status based on payment history
          const decisionPending = actualArray.some(
            (item) => item.Price && !item.PaymentStatus
          );
          const decisionActive = actualArray.every(
            (item) => item.PaymentStatus
          );

          // Categorize the student
          if (decisionPending) {
            pendingStudents.push(newStudent);
          } else if (decisionActive) {
            activeStudents.push(newStudent);
          } else {
            dueStudents.push(newStudent);
          }
        }
      });

      // Step 5: Bulk insert students into their respective collections
      await Promise.all([
        pendingStudents.length &&
          studentProfilePendingModel.insertMany(pendingStudents.reverse()),
        activeStudents.length &&
          studentProfileActiveModel.insertMany(activeStudents.reverse()),
        dueStudents.length &&
          studentProfileDueModel.insertMany(dueStudents.reverse()),
      ]);

      console.log("All students have been processed and categorized.");
    } catch (error) {
      console.error("Error processing students:", error);
    }
  };

  const processAnual = async () => {
    console.log("Running daily Annual student processing job");
    try {
      // Step 1: Clear existing records in the collections
      await annualDueStudentsModel.deleteMany({});
      await annualPendingStudentsModel.deleteMany({});
      await annualActiveStudentsModel.deleteMany({});
      await annualIrregularStudentsModel.deleteMany({});

      // Step 2: Fetch all students from the main collection
      const allStudents = await studentProfileModel.find({}).lean().exec();

      // Step 3: Process each student and categorize them

      const activeStudents = [];
      const dueStudents = [];
      const pendingStudents = [];
      const irregularStudents = [];

      allStudents.forEach((student) => {
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
          accountStatus: student.accountStatus,
        };

        if (student.accountStatus.status === "regular") {
          if (
            student.paymentStatus.addmissionDueStatus === false &&
            student.paymentStatus.consequentDueStatus === false
          ) {
            activeStudents.push(newStudent);
          } else if (
            student.paymentStatus.addmissionDueStatus === true &&
            student.paymentStatus.consequentDueStatus === false
          ) {
            dueStudents.push(newStudent);
          } else if (
            student.paymentStatus.addmissionDueStatus === true &&
            student.paymentStatus.consequentDueStatus === true
          ) {
            pendingStudents.push(newStudent);
          }
        } else {
          irregularStudents.push(newStudent);
        }
      });

      // Perform bulk insert operations
      await annualActiveStudentsModel.insertMany(activeStudents.reverse());
      await annualDueStudentsModel.insertMany(dueStudents.reverse());
      await annualPendingStudentsModel.insertMany(pendingStudents.reverse());
      await annualIrregularStudentsModel.insertMany(
        irregularStudents.reverse()
      );

      console.log("All Annual students have been processed and categorized.");
    } catch (error) {
      console.error("Error processing Annual students:", error);
    }
  };

  //every day at midnight
  cron.schedule("0 0 * * *", () => {
    processAl();
    processAnual();
  });

  //every hour
  // cron.schedule("0 * * * *", () => {
  //   processAl();
  // });
}

// Schedule the job to run every day at midnight
module.exports = processAllStudents;
