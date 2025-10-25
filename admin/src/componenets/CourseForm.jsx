import React, { useState } from "react";
import { UploadCloud, Plus, X } from "lucide-react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const CourseForm = ({ setActiveView }) => {

  const [load,setLoad] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    exercises: "",
    section: "",
    enrollment: 0,
    price: "",
    imageUrl: "",
    imageUrl2: "",
    createdBy: "",
    titleOfCreator: "",
    totalLength: "",
    published: false,
    whatYoullLearn: [],
    skillsThatMatter: [],
    curriculumCard: [],
    course: [],
    quizQuestions: [],
  });

  // existing
  const [newLearn, setNewLearn] = useState({ number: "", title: "", description: "", link: "" });
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

  // What You'll Learn - UPDATED
  const addLearnItem = () => {
    if (!newLearn.title) return;
    setFormData({
      ...formData,
      whatYoullLearn: [...formData.whatYoullLearn, { 
        number: formData.whatYoullLearn.length + 1,
        title: newLearn.title,
        description: newLearn.description,
        link: newLearn.link
      }],
    });
    setNewLearn({ number: "", title: "", description: "", link: "" });
  };

  const removeLearnItem = (index) => {
    const updated = [...formData.whatYoullLearn];
    updated.splice(index, 1);
    // Update numbers after removal
    const renumbered = updated.map((item, idx) => ({
      ...item,
      number: idx + 1
    }));
    setFormData({ ...formData, whatYoullLearn: renumbered });
  };

  // Skills - UPDATED (now just name field)
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

  // Curriculum - UPDATED (number field)
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
      curriculumCard: [...formData.curriculumCard, { 
        number: parseInt(newCurriculum.number) || formData.curriculumCard.length + 1,
        title: newCurriculum.title,
        topics: newCurriculum.topics.filter(topic => topic.trim() !== "")
      }],
    });
    setNewCurriculum({ number: "", title: "", topics: [""] });
  };

  const removeCurriculum = (i) => {
    const updated = [...formData.curriculumCard];
    updated.splice(i, 1);
    // Update numbers after removal
    const renumbered = updated.map((item, idx) => ({
      ...item,
      number: idx + 1
    }));
    setFormData({ ...formData, curriculumCard: renumbered });
  };

  // Course Parts - UPDATED (lessons is now an array)
  const addLesson = () => {
    setNewCoursePart({
      ...newCoursePart,
      lessons: [
        ...newCoursePart.lessons,
        { title: "", videoId: "", description: "", keyNotes: "" },
      ],
    });
  };

   const updateLesson = (field, value) => {
      const updatedLesson = { ...newCoursePart.lessons[0], [field]: value };
      setNewCoursePart({ 
        ...newCoursePart, 
        lessons: [updatedLesson] 
      });
    };

  // Course Parts - UPDATED (only one lesson per part)
    const addCoursePart = () => {
      if (!newCoursePart.part || !newCoursePart.title) return;
      setFormData({
        ...formData,
        course: [...formData.course, { 
          part: parseInt(newCoursePart.part),
          title: newCoursePart.title,
          lessons: {
            title: newCoursePart.lessons[0].title,
            videoId: newCoursePart.lessons[0].videoId,
            description: newCoursePart.lessons[0].description,
            keyNotes: newCoursePart.lessons[0].keyNotes
          }
        }],
      });
      setNewCoursePart({
        part: "",
        title: "",
        lessons: [{ title: "", videoId: "", description: "", keyNotes: "" }],
      });
    };

    const removeCoursePart = (i) => {
      const updated = [...formData.course];
      updated.splice(i, 1);
      setFormData({ ...formData, course: updated });
    };

    // Update lesson function for single lesson
    

  // Quiz Section - UPDATED (correct structure)
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
      quizQuestions: [...formData.quizQuestions, { 
        question: newQuiz.question,
        options: newQuiz.options.filter(opt => opt.trim() !== ""),
        correctAnswer: newQuiz.correctAnswer
      }],
    });
    setNewQuiz({ question: "", options: [""], correctAnswer: "" });
  };

  const removeQuiz = (i) => {
    const updated = [...formData.quizQuestions];
    updated.splice(i, 1);
    setFormData({ ...formData, quizQuestions: updated });
  };

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true)
   try{
    axios.post(`http://localhost:4000/courses`,formData)
    setLoad(false)
    navigate('/courses')
   }catch(err){
    console.log(err);
    setLoad(false)
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
                Section
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">-- Select Section --</option>
                <option value="GENERATIVE AI">GENERATIVE AI</option>
                <option value="PROMPT ENGINEERING">PROMPT ENGINEERING</option>
                <option value="ISLAMIC">ISLAMIC</option>
                <option value="COMMUNICATION">COMMUNICATION</option>
                <option value="DESIGN">DESIGN</option>
                <option value="AI AND ML">AI AND ML</option>
                <option value="MARKETING">MARKETING</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
              </select>

            </div>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                Title of Creator
              </label>
              <input
                type="text"
                name="titleOfCreator"
                value={formData.titleOfCreator}
                onChange={handleChange}
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

          {/* What You'll Learn Section - UPDATED */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              What You'll Learn
            </h3>
            <div className="space-y-2 mt-2">
              {formData.whatYoullLearn.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border"
                >
                  <div>
                    <span className="font-medium">#{item.number} - {item.title}</span>
                    {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                    {item.link && <p className="text-xs text-blue-500 mt-1">{item.link}</p>}
                  </div>
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
            <div className="space-y-2 mt-3">
              <input
                type="text"
                placeholder="Title"
                value={newLearn.title}
                onChange={(e) =>
                  setNewLearn({ ...newLearn, title: e.target.value })
                }
                className="w-full border rounded-xl p-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newLearn.description}
                onChange={(e) =>
                  setNewLearn({ ...newLearn, description: e.target.value })
                }
                className="w-full border rounded-xl p-2"
              />
              <input
                type="text"
                placeholder="Link (optional)"
                value={newLearn.link}
                onChange={(e) =>
                  setNewLearn({ ...newLearn, link: e.target.value })
                }
                className="w-full border rounded-xl p-2"
              />
              <button
                type="button"
                onClick={addLearnItem}
                className="bg-indigo-600 text-white rounded-xl px-4 py-2 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Learning Outcome
              </button>
            </div>
          </div>

          {/* Skills That Matter - UPDATED */}
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
                  <strong>#{c.number} - {c.title}</strong>
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
              <strong>Part {part.part}: {part.title}</strong>
              <p className="text-sm text-gray-600 mt-1">
                Lesson: {part.lessons.title}
              </p>
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

        <div className="grid grid-cols-2 gap-2 mt-3">
          <input
            type="number"
            placeholder="Part Number"
            value={newCoursePart.part}
            onChange={(e) =>
              setNewCoursePart({ ...newCoursePart, part: e.target.value })
            }
            className="border rounded-xl p-2"
          />
          <input
            type="text"
            placeholder="Part Title"
            value={newCoursePart.title}
            onChange={(e) =>
              setNewCoursePart({ ...newCoursePart, title: e.target.value })
            }
            className="border rounded-xl p-2"
          />
        </div>

        {/* Single Lesson Inputs */}
        <div className="border p-3 mt-2 rounded-xl bg-gray-50">
          <input
            type="text"
            placeholder="Lesson Title"
            value={newCoursePart.lessons[0].title}
            onChange={(e) => updateLesson("title", e.target.value)}
            className="border rounded-xl p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Youtube Video ID"
            value={newCoursePart.lessons[0].videoId}
            onChange={(e) => updateLesson("videoId", e.target.value)}
            className="border rounded-xl p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCoursePart.lessons[0].description}
            onChange={(e) => updateLesson("description", e.target.value)}
            className="border rounded-xl p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Key Notes"
            value={newCoursePart.lessons[0].keyNotes}
            onChange={(e) => updateLesson("keyNotes", e.target.value)}
            className="border rounded-xl p-2 w-full"
          />
        </div>

        <button
          type="button"
          onClick={addCoursePart}
          className="bg-indigo-600 text-white px-3 py-2 rounded-xl mt-2"
        >
          + Add New Part 
        </button>
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
                  <p className="text-sm text-green-600">
                    Correct: {q.correctAnswer}
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