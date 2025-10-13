import React, { useState } from "react";
import { UploadCloud, Plus, X } from "lucide-react";
const axios = require("axios")
const CourseForm = ({ setActiveView }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    exercises: "",
    hours: "",
    enrollment: "",
    price: "",
    imageUrl: "",
    imageUrl2: "",
    createdBy: "",
    totalLength: "",
    published: false,
    whatYoullLearn: [],
    skillsThatMatter: [],
    curriculumCard: [],
    course: [],
    quizQuestions: [],
  });

  // existing
  const [newLearn, setNewLearn] = useState({ title: "", description: "" });
  const [newSkill, setNewSkill] = useState("");

  // new
  const [newCurriculum, setNewCurriculum] = useState({
    number: "",
    title: "",
    topics: [""],
  });
  const [newCoursePart, setNewCoursePart] = useState({
    part: "",
    lessons: [{ title: "", videoId: "", description: "", keyNotes: "" }],
  });
  const [newQuiz, setNewQuiz] = useState({
    question: "",
    options: [""],
    correctAnswer: "",
  });

  // === helpers ===
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // What You'll Learn
  const addLearnItem = () => {
    if (!newLearn.title) return;
    setFormData({
      ...formData,
      whatYoullLearn: [...formData.whatYoullLearn, { ...newLearn }],
    });
    setNewLearn({ title: "", description: "" });
  };

  const removeLearnItem = (index) => {
    const updated = [...formData.whatYoullLearn];
    updated.splice(index, 1);
    setFormData({ ...formData, whatYoullLearn: updated });
  };

  // Skills
  const addSkill = () => {
    if (!newSkill) return;
    setFormData({
      ...formData,
      skillsThatMatter: [...formData.skillsThatMatter, { name: newSkill }],
    });
    setNewSkill("");
  };

  const removeSkill = (index) => {
    const updated = [...formData.skillsThatMatter];
    updated.splice(index, 1);
    setFormData({ ...formData, skillsThatMatter: updated });
  };

  // Curriculum
  const addCurriculumTopic = () =>
    setNewCurriculum({
      ...newCurriculum,
      topics: [...newCurriculum.topics, ""],
    });

  const updateCurriculumTopic = (index, value) => {
    const updated = [...newCurriculum.topics];
    updated[index] = value;
    setNewCurriculum({ ...newCurriculum, topics: updated });
  };

  const addCurriculum = () => {
    if (!newCurriculum.title) return;
    setFormData({
      ...formData,
      curriculumCard: [...formData.curriculumCard, { ...newCurriculum }],
    });
    setNewCurriculum({ number: "", title: "", topics: [""] });
  };

  const removeCurriculum = (i) => {
    const updated = [...formData.curriculumCard];
    updated.splice(i, 1);
    setFormData({ ...formData, curriculumCard: updated });
  };

  // Course Parts
  const addLesson = () => {
    setNewCoursePart({
      ...newCoursePart,
      lessons: [
        ...newCoursePart.lessons,
        { title: "", videoId: "", description: "", keyNotes: "" },
      ],
    });
  };

  const updateLesson = (index, field, value) => {
    const updated = [...newCoursePart.lessons];
    updated[index][field] = value;
    setNewCoursePart({ ...newCoursePart, lessons: updated });
  };

  const addCoursePart = () => {
    if (!newCoursePart.part) return;
    setFormData({
      ...formData,
      course: [...formData.course, { ...newCoursePart }],
    });
    setNewCoursePart({
      part: "",
      lessons: [{ title: "", videoId: "", description: "", keyNotes: "" }],
    });
  };

  const removeCoursePart = (i) => {
    const updated = [...formData.course];
    updated.splice(i, 1);
    setFormData({ ...formData, course: updated });
  };

  // Quiz Section
  const addOption = () =>
    setNewQuiz({ ...newQuiz, options: [...newQuiz.options, ""] });

  const updateOption = (index, value) => {
    const updated = [...newQuiz.options];
    updated[index] = value;
    setNewQuiz({ ...newQuiz, options: updated });
  };

  const addQuiz = () => {
    if (!newQuiz.question) return;
    setFormData({
      ...formData,
      quizQuestions: [...formData.quizQuestions, { ...newQuiz }],
    });
    setNewQuiz({ question: "", options: [""], correctAnswer: "" });
  };

  const removeQuiz = (i) => {
    const updated = [...formData.quizQuestions];
    updated.splice(i, 1);
    setFormData({ ...formData, quizQuestions: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   try{
    axios.post('http://localhost:4000/courses',formData)
   }catch(err){
    console.log(err);
   }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Upload New Course</h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg border max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Course Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Advanced Prompt Engineering"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="A concise summary of what students will learn."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Exercises
              </label>
              <input
                type="text"
                name="exercises"
                value={formData.exercises}
                onChange={handleChange}
                placeholder="e.g., 5 coding tasks"
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (hours)
              </label>
              <input
                type="text"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enrollment
              </label>
              <input
                type="text"
                name="enrollment"
                value={formData.enrollment}
                onChange={handleChange}
                placeholder="e.g., 1200 students"
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
                required
              />
            </div>
          </div>

          {/* Images & Creator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL 1
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL 2
              </label>
              <input
                type="text"
                name="imageUrl2"
                value={formData.imageUrl2}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created By
              </label>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Length
              </label>
              <input
                type="text"
                name="totalLength"
                value={formData.totalLength}
                onChange={handleChange}
                placeholder="e.g., 15h 30m"
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3"
                required
              />
            </div>
          </div>

          {/* Publish Switch */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Publish Course</label>
          </div>

          {/* What You'll Learn Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              What You'll Learn
            </h3>
            <div className="space-y-2 mt-2">
              {formData.whatYoullLearn.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-xl border"
                >
                  <span>{item.title}</span>
                  <button
                    type="button"
                    onClick={() => removeLearnItem(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Title"
                value={newLearn.title}
                onChange={(e) =>
                  setNewLearn({ ...newLearn, title: e.target.value })
                }
                className="flex-1 border rounded-xl p-2"
              />
              <button
                type="button"
                onClick={addLearnItem}
                className="bg-indigo-600 text-white rounded-xl px-3 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          </div>

          {/* Skills That Matter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Skills That Matter
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skillsThatMatter.map((skill, i) => (
                <div
                  key={i}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(i)}
                    className="ml-2 text-indigo-600 hover:text-indigo-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 border rounded-xl p-2"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-indigo-600 text-white rounded-xl px-3 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          </div>

          {/* === Curriculum Section === */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Curriculum
            </h3>

            {formData.curriculumCard.map((c, i) => (
              <div
                key={i}
                className="border p-3 mb-2 rounded-xl bg-gray-50 flex justify-between"
              >
                <div>
                  <strong>{c.title}</strong>
                  <p className="text-sm text-gray-600">
                    Topics: {c.topics.join(", ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeCurriculum(i)}
                  className="text-red-500"
                >
                  <X />
                </button>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2 mt-3">
              <input
                type="number"
                placeholder="Number"
                value={newCurriculum.number}
                onChange={(e) =>
                  setNewCurriculum({
                    ...newCurriculum,
                    number: e.target.value,
                  })
                }
                className="border rounded-xl p-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={newCurriculum.title}
                onChange={(e) =>
                  setNewCurriculum({
                    ...newCurriculum,
                    title: e.target.value,
                  })
                }
                className="border rounded-xl p-2"
              />
            </div>

            {newCurriculum.topics.map((topic, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Topic ${i + 1}`}
                value={topic}
                onChange={(e) => updateCurriculumTopic(i, e.target.value)}
                className="border rounded-xl p-2 mt-2 w-full"
              />
            ))}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={addCurriculumTopic}
                className="bg-gray-200 px-2 py-1 rounded-xl"
              >
                + Topic
              </button>
              <button
                type="button"
                onClick={addCurriculum}
                className="bg-indigo-600 text-white px-3 py-1 rounded-xl"
              >
                + Add Curriculum
              </button>
            </div>
          </div>

          {/* === Course Parts === */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Course Parts
            </h3>

            {formData.course.map((part, i) => (
              <div
                key={i}
                className="border p-3 mb-2 rounded-xl bg-gray-50 flex justify-between"
              >
                <div>
                  <strong>Part {part.part}</strong> –{" "}
                  {part.lessons.length} Lessons
                </div>
                <button
                  type="button"
                  onClick={() => removeCoursePart(i)}
                  className="text-red-500"
                >
                  <X />
                </button>
              </div>
            ))}

            <input
              type="number"
              placeholder="Part Number"
              value={newCoursePart.part}
              onChange={(e) =>
                setNewCoursePart({ ...newCoursePart, part: e.target.value })
              }
              className="border rounded-xl p-2 mt-2 w-full"
            />

            {newCoursePart.lessons.map((lesson, i) => (
              <div key={i} className="border p-3 mt-2 rounded-xl bg-gray-50">
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={lesson.title}
                  onChange={(e) => updateLesson(i, "title", e.target.value)}
                  className="border rounded-xl p-2 w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Video ID"
                  value={lesson.videoId}
                  onChange={(e) => updateLesson(i, "videoId", e.target.value)}
                  className="border rounded-xl p-2 w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={lesson.description}
                  onChange={(e) =>
                    updateLesson(i, "description", e.target.value)
                  }
                  className="border rounded-xl p-2 w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Key Notes"
                  value={lesson.keyNotes}
                  onChange={(e) => updateLesson(i, "keyNotes", e.target.value)}
                  className="border rounded-xl p-2 w-full"
                />
              </div>
            ))}

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={addLesson}
                className="bg-gray-200 px-2 py-1 rounded-xl"
              >
                + Lesson
              </button>
              <button
                type="button"
                onClick={addCoursePart}
                className="bg-indigo-600 text-white px-3 py-1 rounded-xl"
              >
                + Add Part
              </button>
            </div>
          </div>

          {/* === Quiz Section === */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quiz</h3>

            {formData.quizQuestions.map((q, i) => (
              <div
                key={i}
                className="border p-3 mb-2 rounded-xl bg-gray-50 flex justify-between"
              >
                <div>
                  <strong>{q.question}</strong>
                  <p className="text-sm text-gray-600">
                    Options: {q.options.join(", ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeQuiz(i)}
                  className="text-red-500"
                >
                  <X />
                </button>
              </div>
            ))}

            <input
              type="text"
              placeholder="Question"
              value={newQuiz.question}
              onChange={(e) =>
                setNewQuiz({ ...newQuiz, question: e.target.value })
              }
              className="border rounded-xl p-2 w-full mb-2"
            />
            {newQuiz.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                className="border rounded-xl p-2 mb-2 w-full"
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              value={newQuiz.correctAnswer}
              onChange={(e) =>
                setNewQuiz({ ...newQuiz, correctAnswer: e.target.value })
              }
              className="border rounded-xl p-2 w-full mb-2"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={addOption}
                className="bg-gray-200 px-2 py-1 rounded-xl"
              >
                + Option
              </button>
              <button
                type="button"
                onClick={addQuiz}
                className="bg-indigo-600 text-white px-3 py-1 rounded-xl"
              >
                + Add Quiz
              </button>
            </div>
          </div>

          {/* === Submit === */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setActiveView("courses")}
              className="px-4 py-2 border rounded-xl bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
            >
              <UploadCloud className="w-5 h-5 inline mr-2" />
              Publish Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
