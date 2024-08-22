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

const resultController = require("../controllers/resultController");
const logController = require("../controllers/logController");

const bookController = require("../controllers/bookController");
const departmentController = require("../controllers/departmentController");
const jamatController = require("../controllers/jamatController");
const paymentController = require("../controllers/paymentController");
const SemesterController = require("../controllers/semesterController");
const videoController = require("../controllers/videoController");
const qaFormController = require("../controllers/qaFormController");

const workController = require("../controllers/workController");
const RichTextController = require("../controllers/RichTextController");
const otpController = require("../controllers/otpController");
const pushNoticeController = require("../controllers/pushNoticeController");
const classController = require("../controllers/classController");

const donationController = require("../controllers/donationController");
const cloudinaryImageController = require("../controllers/cloudinaryController");
const profileController = require("../controllers/profileController");
const abacusInstitutionController = require("../controllers/abacusInstitutionController");

router.get(
  "/select-all-students/:pageNo/:perPage/:searchKey?",
  profileController.selectAllStudentsPlus
);

router.get(
  "/select-all-students-monthly-active/:pageNo/:perPage/:searchKey?",
  profileController.selectAllStudentsMonthlyActivePlus
);

router.get(
  "/select-all-students-monthly-due/:pageNo/:perPage/:searchKey?",
  profileController.selectAllStudentsMonthlyDuePlus
);

router.get(
  "/select-all-students-monthly-pending/:pageNo/:perPage/:searchKey?",
  profileController.selectAllStudentsMonthlyPendingPlus
);

router.get(
  "/select-all-teachers/:pageNo/:perPage/:searchKey?",
  profileController.selectAllTeachersPlus
);

router.get(
  "/select-abacus-institutions/:pageNo/:perPage/:searchKey?",
  abacusInstitutionController.selectAbacusInstitutionsPlus
);

router.get(
  "/select-courses/:pageNo/:perPage/:searchKey?",
  courseController.selectCoursesPlus
);

router.get(
  "/select-menus/:pageNo/:perPage/:searchKey?",
  menuController.selectMenusPlus
);

router.get(
  "/select-sliders/:pageNo/:perPage/:searchKey?",
  sliderController.selectSlidersPlus
);

router.get(
  "/select-notices/:pageNo/:perPage/:searchKey?",
  noticeController.selectNoticesPlus
);

router.get(
  "/select-events/:pageNo/:perPage/:searchKey?",
  eventController.selectEventsPlus
);

router.get(
  "/select-posts/:pageNo/:perPage/:searchKey?",
  postController.selectPostsPlus
);

router.get(
  "/select-activities/:pageNo/:perPage/:searchKey?",
  activityController.selectActivitiesPlus
);

router.get(
  "/select-comments/:pageNo/:perPage/:searchKey?",
  commentController.selectCommentsPlus
);

router.get(
  "/select-abouts/:pageNo/:perPage/:searchKey?",
  aboutController.selectAboutsPlus
);

router.get(
  "/select-widgets/:pageNo/:perPage/:searchKey?",
  widgetController.selectWidgetsPlus
);

router.get(
  "/select-results/:pageNo/:perPage/:searchKey?",
  resultController.selectResultsPlus
);

router.get(
  "/select-logs/:pageNo/:perPage/:searchKey?",
  logController.selectLogsPlus
);

router.get(
  "/select-books/:pageNo/:perPage/:searchKey?",
  bookController.selectBooksPlus
);

router.get(
  "/select-departments/:pageNo/:perPage/:searchKey?",
  departmentController.selectDepartmentsPlus
);

router.get(
  "/select-jamats/:pageNo/:perPage/:searchKey?",
  jamatController.selectJamatsPlus
);

router.get(
  "/select-payments/:pageNo/:perPage/:searchKey?",
  paymentController.selectPaymentsPlus
);

router.get(
  "/select-semesters/:pageNo/:perPage/:searchKey?",
  SemesterController.selectSemestersPlus
);

router.get(
  "/select-videos/:pageNo/:perPage/:searchKey?",
  videoController.selectVideosPlus
);

router.get(
  "/select-qaforms/:pageNo/:perPage/:searchKey?",
  qaFormController.selectQAFormPlus
);

router.get(
  "/select-works/:pageNo/:perPage/:searchKey?",
  workController.selectWorksPlus
);

router.get(
  "/select-richtexts/:pageNo/:perPage/:searchKey?",
  RichTextController.selectRichTextsPlus
);

router.get(
  "/select-otps/:pageNo/:perPage/:searchKey?",
  otpController.selectOTPSPlus
);

router.get(
  "/select-pushnotices/:pageNo/:perPage/:searchKey?",
  pushNoticeController.selectPushNoticesPlus
);

router.get(
  "/select-classes/:pageNo/:perPage/:searchKey?",
  classController.selectClassesPlus
);

router.get(
  "/select-donations/:pageNo/:perPage/:searchKey?",
  donationController.selectDonationsPlus
);

router.get(
  "/select-images/:pageNo/:perPage/:searchKey?",
  cloudinaryImageController.selectImagesPlus
);

module.exports = router;
