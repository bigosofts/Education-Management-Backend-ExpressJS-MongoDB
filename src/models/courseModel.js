const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    courseCode: { type: String, required: true, unique: true },
    imageLink: {
      type: String,
    },
    title: {
      en: {
        type: String,
      },
      bn: {
        type: String,
      },
    },
    description: {
      en: {
        type: String,
      },
      bn: {
        type: String,
      },
    },
    categories: {
      en: {
        type: String,
      },
      bn: {
        type: String,
      },
    },
    createdDate: { type: Date },
    updatedDate: { type: Date },
    startingDate: {
      en: {
        type: String,
      },
      bn: {
        type: String,
      },
    },
    popularity: {
      en: {
        type: String,
      },
      bn: {
        type: String,
      },
    },
    jamatName: [{ type: String }],
    activeStatus: {
      type: String,
    },
    instructor: [
      {
        name: {
          en: {
            type: String,
          },
          bn: {
            type: String,
          },
        },
        experience: {
          en: {
            type: String,
          },
          bn: {
            type: String,
          },
        },
        image: { type: String },
      },
    ],
    coursePrice: {
      registration: {
        tk: { type: Number },
        us: { type: Number },
      },
      monthly: {
        tk: { type: Number },
        us: { type: Number },
      },
      time: {
        heading: { en: { type: String }, bn: { type: String } },
        text: { en: { type: String }, bn: { type: String } },
      },
    },
    courseButton: {
      text: {
        en: { type: String },
        bn: { type: String },
      },
      link: {
        type: String,
      },
    },
    courseInfo: [
      {
        title: {
          en: { type: String },
          bn: { type: String },
        },
      },
    ],
    detailData: [
      {
        title: {
          en: { type: String },
          bn: { type: String },
        },
        desc: {
          en: { type: String },
          bn: { type: String },
        },
      },
    ],
    courseSyllabus: [
      {
        icon: { type: String },
        text: {
          en: { type: String },
          bn: { type: String },
        },
        desc: {
          en: { type: String },
          bn: { type: String },
        },
        img: { type: String },
      },
    ],
    faq: [
      {
        question: {
          en: { type: String },
          bn: { type: String },
        },
        answer: {
          en: { type: String },
          bn: { type: String },
        },
      },
    ],
    commentID: [{ type: String }],
    courseMaterial: [
      {
        en: { type: String },
        bn: { type: String },
      },
    ],
    commonQuestion: [
      {
        question: {
          en: { type: String },
          bn: { type: String },
        },
        answer: {
          en: { type: String },
          bn: { type: String },
        },
      },
    ],
    courseVideoID: [{ type: String }],
  },
  { versionKey: false }
);

const courseModel = mongoose.model("courses", DataSchema);

module.exports = courseModel;
