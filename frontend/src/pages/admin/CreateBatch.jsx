import { useEffect, useState } from "react";
import axios from "../../api/axios";

const CreateBatch = () => {
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
    course_id: "",
  });

  const [loading, setLoading] = useState(false);

  // Load courses for dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/batches", {
        name: form.name,
        start_date: form.start_date,
        end_date: form.end_date,
        course_id: Number(form.course_id),
      });

      alert("Batch created successfully");

      setForm({
        name: "",
        start_date: "",
        end_date: "",
        course_id: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error creating batch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

        <h2 className="text-xl font-bold mb-4">Create Batch</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Batch Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          {/* Course dropdown */}
          <select
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create Batch"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateBatch;