import { useState } from "react";
import { createCourse } from "../../api/courseApi";

const CreateCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        description: form.description,
        duration: Number(form.duration),
      };

      await createCourse(payload);

      alert("Course created successfully");

      setForm({
        title: "",
        description: "",
        duration: "",
      });

    } catch (err) {
      alert(err.response?.data?.detail || "Error creating course");
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-md bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Course</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={form.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Create Course
        </button>

      </form>
    </div>
  );
};

export default CreateCourse;