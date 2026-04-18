import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchStudent();
    }
  }, [user]);

  const fetchStudent = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/students/${user.id}`);

      console.log("STUDENT DATA:", res.data);

      setStudent(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6 text-red-500">
        No student data found
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Welcome {student.name}
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="p-4 bg-white shadow rounded">
          <p className="font-semibold">Email</p>
          <p>{student.email}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="font-semibold">Fee Status</p>
          <p>{student.fee_status}</p>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* COURSE */}
  <div className="bg-white shadow p-4 rounded">
    <h2 className="font-semibold">Course</h2>

    <p>Name: {student.course?.title}</p>
    <p>ID: {student.course?.id}</p>
  </div>

  {/* BATCH */}
  <div className="bg-white shadow p-4 rounded">
    <h2 className="font-semibold">Batch</h2>

    <p>Name: {student.batch?.name}</p>
    <p>ID: {student.batch?.id}</p>
  </div>

</div>
      </div>

    </div>
  );
};

export default StudentDashboard;