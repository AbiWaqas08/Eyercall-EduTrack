import { useEffect, useState } from "react";
import { createBatch } from "../../api/batchApi";
import { getCourses } from "../../api/courseApi";

const CreateBatch = () => {
  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
    course_id: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      name: form.name,
      start_date: form.start_date,  // ✅ YYYY-MM-DD
      end_date: form.end_date,      // ✅ YYYY-MM-DD
      course_id: Number(form.course_id),
    };

    await createBatch(payload);

    alert("Batch created successfully");
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.detail || "Error");
  }
};

  return (
    <div className="p-6 max-w-md bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Batch</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          name="name"
          placeholder="Batch Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="course_id"
          value={form.course_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Create Batch
        </button>

      </form>
    </div>
  );
};

export default CreateBatch;