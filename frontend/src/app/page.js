'use client';
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleNavigation = (role) => {
    router.push(`/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl mb-6">ATTENDANCE MARKING SYSTEM</h1>
      <div className="space-y-6">
        <button
          onClick={() => handleNavigation("admin")}
          className="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-blue-300 hover:text-white hover:font-bold"
        >
          Admin
        </button>
        <button
          onClick={() => handleNavigation("teacher")}
          className="bg-green-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-green-300 hover:text-white hover:font-bold"
        >
          Teacher
        </button>
        <button
          onClick={() => handleNavigation("student")}
          className="bg-yellow-500 text-white text-xl px-8 py-4 rounded-lg transform transition-all hover:bg-yellow-300 hover:text-white hover:font-bold"
        >
          Student
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
