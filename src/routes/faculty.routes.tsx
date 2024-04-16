import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create items",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
