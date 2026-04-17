
import CreateBatch from "./CreateBatch";
import CreateCourse from "./CreateCourse";
import CreateStudent from "./CreateStudent";


const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <p>Welcome Admin 👨‍💼</p>
      <CreateStudent/>
      <CreateBatch/>
      <CreateCourse/>
    </div>
  );
};

export default AdminDashboard;