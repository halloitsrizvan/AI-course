import React, { useState } from "react";
import { UploadCloud, Plus, X } from "lucide-react";

const UploadCourseForm = ({ setActiveView }) => {
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
  });

  const [newLearn, setNewLearn] = useState({ title: "", description: "" });
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addLearnItem = () => {
    if (!newLearn.title) return;
    setFormData({
      ...formData,
      whatYoullLearn: [...formData.whatYoullLearn, { ...newLearn }],
    });
    setNewLearn({ title: "", description: "" });
  };

  const addSkill = () => {
    if (!newSkill) return;
    setFormData({
      ...formData,
      skillsThatMatter: [...formData.skillsThatMatter, { name: newSkill }],
    });
    setNewSkill("");
  };

  const removeLearnItem = (index) => {
    const updated = [...formData.whatYoullLearn];
    updated.splice(index, 1);
    setFormData({ ...formData, whatYoullLearn: updated });
  };

  const removeSkill = (index) => {
    const updated = [...formData.skillsThatMatter];
    updated.splice(index, 1);
    setFormData({ ...formData, skillsThatMatter: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you'd POST to your backend (axios/fetch)
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-800">
        Upload New Course
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setActiveView("courses")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <UploadCloud className="w-5 h-5 mr-2" />
              Publish Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCourseForm;
