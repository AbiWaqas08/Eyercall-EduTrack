import { useState } from "react";
import axios from "../../api/axios";

const CreateCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/courses/", {
        title: form.title,
        description: form.description,
        duration_days: Number(form.duration),
      });

      alert("Course created successfully");

      setForm({
        title: "",
        description: "",
        duration: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error creating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

        <h2 className="text-xl font-bold mb-4">Create Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Course Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration (days)"
            value={form.duration}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateCourse;