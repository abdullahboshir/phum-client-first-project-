import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create items",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
