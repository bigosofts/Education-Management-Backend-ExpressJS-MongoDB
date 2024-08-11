const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const menuController = require("../controllers/menuController");
const sliderController = require("../controllers/sliderController");
const noticeController = require("../controllers/noticeController");
const eventController = require("../controllers/eventController");
const postController = require("../controllers/postController");
const activityController = require("../controllers/activityController");
const commentController = require("../controllers/commentController");
const aboutController = require("../controllers/aboutController");
const widgetController = require("../controllers/widgetController");
const profileController = require("../controllers/profileController");
const loginController = require("../controllers/loginController");
const resultController = require("../controllers/resultController");
const logController = require("../controllers/logController");

const bookController = require("../controllers/bookController");
const departmentController = require("../controllers/departmentController");
const jamatController = require("../controllers/jamatController");
const paymentController = require("../controllers/paymentController");
const SemesterController = require("../controllers/semesterController");
const videoController = require("../controllers/videoController");
const qaFormController = require("../controllers/qaFormController");
const imageController = require("../controllers/imageController");
const workController = require("../controllers/workController");
const RichTextController = require("../controllers/RichTextController");
const otpController = require("../controllers/otpController");
const pushNoticeController = require("../controllers/pushNoticeController");
const classController = require("../controllers/classController");
const abacusInstitutionController = require("../controllers/abacusInstitutionController");
const donationController = require("../controllers/donationController");

//Middleware Import
const passEncrypted = require("../middlewares/passwordEncryption");
const authverify = require("../middlewares/authverifyMiddleware");

//Email utility import
const emailController = require("../controllers/emailController");
const returnPDFController = require("../controllers/pdfreturnController");
const writePDFController = require("../controllers/pdfwriteController");

//multer import
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/send-email", emailController.sendEmail);

router.get("/hello", (req, res) => {
  res.json({ message: "Hello from Express.js!" });
});
//api for returning pdf

router.get("/pdf/:id", returnPDFController.returnPDFDocument);

//api for write pdf to Drive
router.post(
  "/pdf",
  upload.single("file"),
  writePDFController.writeFileToDriveController
);

//api route for answer
router.post(
  "/pdf-answer",
  upload.single("file"),
  writePDFController.writeAnswerFileToDriveController
);

//api for data management

//authentication
router.post("/isAdmin", authverify, async (req, res) => {
  let userName = req.headers["userName"];
  let userRole = req.headers["userRole"];
  let isAdmin = req.headers["isAdmin"];

  if (userRole == "teacher") {
    const [userDetails] = await profileController.selectTeacherData(userName);
    res.status(200).json({
      status: "Alhamdulillah",
      data: {
        userName,
        userRole,
        isAdmin,
        userDetails,
      },
    });
  } else if (userRole == "student") {
    const [userDetails] = await profileController.selectStudentData(userName);
    res.status(200).json({
      status: "Alhamdulillah",
      data: {
        userName,
        userRole,
        isAdmin,
        userDetails,
      },
    });
  } else if (userRole == "abacus_teacher") {
    const [userDetails] = await abacusInstitutionController.selectAbacusData(
      userName
    );
    res.status(200).json({
      status: "Alhamdulillah",
      data: {
        userName,
        userRole,
        isAdmin,
        userDetails,
      },
    });
  }
});

//read image
router.get("/read-image", imageController.readImage);

router.get("/logout", authverify, (req, res) => {
  let userName = req.headers["userName"];
  let userRole = req.headers["userRole"];
  let isAdmin = req.headers["isAdmin"];
  let userDetails = req.headers["userDetails"];

  res.status(200).json({
    status: "Alhamdulillah",
    data: {
      userName,
      userRole,
      isAdmin,
      userDetails,
    },
  });
});

//signup
router.post(
  "/create-teacher",
  passEncrypted.hashedPassword,
  profileController.createTeacher
);

router.post(
  "/create-abacus-institution",
  passEncrypted.hashedPassword,
  abacusInstitutionController.createAbacusInstitution
);

router.post(
  "/create-student",
  passEncrypted.hashedPassword,
  profileController.createStudent
);

//Login api for students and teachers
router.post(
  "/student-login",
  passEncrypted.checkPasswordStudent,
  loginController.studentLogin
);

router.post(
  "/teacher-login",
  passEncrypted.checkPasswordTeacher,
  loginController.teacherLogin
);

router.post(
  "/institution-login",
  passEncrypted.checkPasswordAbacus,
  loginController.institutionLogin
);

//create data to database
router.post("/create-course", authverify, courseController.createCourse);
router.post("/create-menu", authverify, menuController.createMenu);
router.post("/create-slider", authverify, sliderController.createSlider);
router.post("/create-notice", authverify, noticeController.createNotice);
router.post("/create-event", authverify, eventController.createEvent);
router.post("/create-post", authverify, postController.createPost);
router.post("/create-activity", authverify, activityController.createActivity);
router.post("/create-comment", authverify, commentController.createComment);
router.post("/create-about", authverify, aboutController.createAbout);
router.post("/create-widget", authverify, widgetController.createWidget);
router.post("/create-result", authverify, resultController.createResult);
router.post("/create-log", authverify, logController.createLog);

router.post("/create-book", authverify, bookController.createBook);
router.post(
  "/create-department",
  authverify,
  departmentController.createDepartment
);
router.post("/create-jamat", authverify, jamatController.createJamat);
router.post("/create-payment", authverify, paymentController.createPayments);
router.post("/create-semester", authverify, SemesterController.createSemester);

router.post("/create-video", authverify, videoController.createVideo);
router.post("/create-qaform", authverify, qaFormController.createQAForm);
router.post("/create-work", authverify, workController.createWork);
router.post("/create-richtext", authverify, RichTextController.createRichText);
router.post("/create-otp", otpController.createOTP);
router.post("/create-pushnotice", pushNoticeController.createPushNotice);
router.post("/create-class", classController.createClass);
router.post("/create-donation", donationController.createDonation);

//Select or find the data from the database
router.post("/select-students", profileController.selectStudents);
router.post("/select-all-students", profileController.selectAllStudents);
router.post("/select-teachers", profileController.selectTeachers);
router.post("/select-all-teachers", profileController.selectAllTeachers);

router.post(
  "/select-abacus-institutions",
  abacusInstitutionController.selectAbacusInstitutions
);

router.post("/select-courses", courseController.selectCourses);
router.post("/select-menus", menuController.selectMenus);
router.post("/select-sliders", sliderController.selectSliders);
router.post("/select-notices", noticeController.selectNotices);
router.post("/select-events", eventController.selectEvents);
router.post("/select-posts", postController.selectPosts);
router.post("/select-activities", activityController.selectActivities);
router.post("/select-comments", commentController.selectComments);
router.post("/select-abouts", aboutController.selectAbouts);
router.post("/select-widgets", widgetController.selectWidgets);
router.post("/select-results", resultController.selectResults);
router.post("/select-results-limit", resultController.selectResultslimit);

router.post("/select-logs", logController.selectLogs);
router.post("/select-books", bookController.selectBooks);
router.post("/select-departments", departmentController.selectDepartments);
router.post("/select-jamats", jamatController.selectJamats);
router.post("/select-payments", authverify, paymentController.selectPayments);
router.post("/select-semesters", SemesterController.selectSemesters);

router.post("/select-videos", videoController.selectVideos);
router.post("/select-qaforms", qaFormController.selectQAForm);
router.post("/select-works", workController.selectWorks);
router.post("/select-richtexts", RichTextController.selectRichTexts);
router.post("/select-otps", otpController.selectOTPS);
router.post("/select-pushnotices", pushNoticeController.selectPushNotices);
router.post("/select-classes", classController.selectClasses);
router.post("/select-donations", donationController.selectDonations);

//Select or update the data from the database
router.put("/update-student", profileController.updateStudent);
router.put("/update-teacher", profileController.updateTeacher);
router.put(
  "/update-abacus-institution",
  abacusInstitutionController.updateAbacusInstitution
);

router.put("/update-course", authverify, courseController.updateCourse);
router.put("/update-menu", authverify, menuController.updateMenu);
router.put("/update-slider", authverify, sliderController.updateSlider);
router.put("/update-notice", authverify, noticeController.updateNotice);
router.put("/update-event", authverify, eventController.updateEvent);
router.put("/update-post", authverify, postController.updatePost);
router.put("/update-activity", authverify, activityController.updateActivity);
router.put("/update-comment", authverify, commentController.updateComment);
router.put("/update-about", authverify, aboutController.updateAbout);
router.put("/update-widget", authverify, widgetController.updateWidget);
router.put("/update-result", authverify, resultController.updateResult);
router.put("/update-log", authverify, logController.updateLog);

router.put("/update-book", authverify, bookController.updateBook);
router.put(
  "/update-department",
  authverify,
  departmentController.updateDepartment
);
router.put("/update-jamat", authverify, jamatController.updateJamat);
router.put("/update-payment", authverify, paymentController.updatePayment);
router.put("/update-semester", authverify, SemesterController.updateSemester);

router.put("/update-video", authverify, videoController.updateVideo);
router.put("/update-qaform", authverify, qaFormController.updateQAForm);
router.put("/update-work", authverify, workController.updateWorks);
router.put("/update-richtext", authverify, RichTextController.updateRichText);
router.put("/update-log", authverify, logController.updateLog);
router.put("/update-otp", otpController.updateOTP);
router.put(
  "/update-pushnotice",
  authverify,
  pushNoticeController.updatePushNotice
);
router.put("/update-class", classController.updateClass);
router.put("/update-donation", donationController.updateDonation);

//Delete the data from the database
router.delete(
  "/delete-teacher/:id",
  authverify,
  profileController.deleteTeacher
);

router.delete(
  "/delete-student/:id",
  authverify,
  profileController.deleteStudent
);
router.delete(
  "/delete-abacus-institution/:id",
  authverify,
  abacusInstitutionController.deleteAbacusInstitution
);

router.delete("/delete-course/:id", authverify, courseController.deleteCourse);
router.delete("/delete-menu/:id", authverify, menuController.deleteMenu);
router.delete("/delete-slider/:id", authverify, sliderController.deleteSlider);
router.delete("/delete-notice/:id", authverify, noticeController.deleteNotice);
router.delete("/delete-event/:id", authverify, eventController.deleteEvent);
router.delete("/delete-post/:id", authverify, postController.deletePost);
router.delete(
  "/delete-activity/:id",
  authverify,
  activityController.deleteActivity
);
router.delete(
  "/delete-comment/:id",
  authverify,
  commentController.deleteComment
);
router.delete("/delete-about/:id", authverify, aboutController.deleteAbout);
router.delete("/delete-widget/:id", authverify, widgetController.deleteWidget);
router.delete("/delete-result/:id", authverify, resultController.deleteResult);
router.delete("/delete-log/:id", authverify, logController.deleteLog);

router.delete("/delete-book/:id", authverify, bookController.deleteBook);
router.delete(
  "/delete-department/:id",
  authverify,
  departmentController.deleteDepartment
);
router.delete("/delete-jamat/:id", authverify, jamatController.deleteJamat);
router.delete(
  "/delete-payment/:id",
  authverify,
  paymentController.deletePayment
);
router.delete(
  "/delete-semester/:id",
  authverify,
  SemesterController.deleteSemester
);

router.delete("/delete-video/:id", authverify, videoController.deleteVideo);
router.delete("/delete-qaform/:id", authverify, qaFormController.deleteQAForm);
router.delete("/delete-work/:id", authverify, workController.deleteWork);
router.delete(
  "/delete-richtext/:id",
  authverify,
  RichTextController.deleteRichText
);
router.delete("/delete-otp/:id", authverify, otpController.deleteOTP);
router.delete(
  "/delete-pushnotice/:id",
  authverify,
  pushNoticeController.deletePushNotice
);

router.delete("/delete-class/:id", authverify, classController.deleteClass);
router.delete(
  "/delete-donation/:id",
  authverify,
  donationController.deleteDonation
);

module.exports = router;
