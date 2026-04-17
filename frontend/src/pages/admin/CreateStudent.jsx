import { useEffect, useState } from "react";
import axios from "../../api/axios";

const CreateStudent = () => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course_id: "",
    batch_id: "",
    fee: "",
    course_end_date: "",
  });

  // Load courses
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/courses");
      setCourses(res.data);
    };

    const fetchBatches = async () => {
      const res = await axios.get("/batches");
      setBatches(res.data);
    };

    fetchCourses();
    fetchBatches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/students", {
        ...form,
        course_id: Number(form.course_id),
        batch_id: Number(form.batch_id),
        fee: Number(form.fee),
      });

      alert("Student created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        course_id: "",
        batch_id: "",
        fee: "",
        course_end_date: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error creating student");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">

      <h2 className="text-xl font-bold mb-6">Create Student</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Student Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter student name"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter email"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter password"
          />
        </div>

        {/* COURSE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Course
          </label>
          <select
            value={form.course_id}
            onChange={(e) => setForm({ ...form, course_id: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Choose course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* BATCH */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Batch
          </label>
          <select
            value={form.batch_id}
            onChange={(e) => setForm({ ...form, batch_id: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Choose batch</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>

        {/* FEE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Fee
          </label>
          <input
            type="number"
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter fee"
          />
        </div>

        {/* END DATE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Course End Date
          </label>
          <input
            type="date"
            value={form.course_end_date}
            onChange={(e) =>
              setForm({ ...form, course_end_date: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Student
        </button>

      </form>
    </div>
  );
};

export default CreateStudent;