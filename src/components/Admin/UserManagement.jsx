import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUserRole,
  deleteUser,
} from "../../redux/slice/usersAdminSlice";
import { toast } from "sonner";
import UserTableSkeleton from "./UserTableSkeleton";
import Error from "../Common/Error";

const UserManagement = () => {
  const { users, loading, error } = useSelector((state) => state.usersAdmin);
  const dispatch = useDispatch();

  const [updatingUserId, setUpdatingUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData))
      .unwrap()
      .then(() => {
        toast.success("User added successfully!");
        setFormData({ name: "", email: "", password: "", role: "user" });
      })
      .catch((err) => toast.error(err));
  };

  const handleRoleChange = (userId, newRole) => {
    setUpdatingUserId(userId);
    dispatch(updateUserRole({ userId: userId, role: newRole }))
      .unwrap()
      .then(() => toast.success("User role updated!"))
      .catch((err) => toast.error(err))
      .finally(() => setUpdatingUserId(null));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId))
        .unwrap()
        .then(() => toast.success("User deleted successfully!"))
        .catch((err) => toast.error(err));
    }
  };

  const renderUserList = () => {
    if (loading && users.length === 0) return <UserTableSkeleton />;
    if (error)
      return <Error message={error} onRetry={() => dispatch(fetchUsers())} />;

    return (
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 text-sm uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map((user) => (
              <tr key={user._id} className="border-b bg-white hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    disabled={updatingUserId === user._id}
                    className="p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">User Management</h2>
      {/* New User Form */}
      <div className="p-6 rounded-lg mb-8 bg-white border">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          {/* Name Input */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email Input */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password Input */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Role Select */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 h-10"
          >
            Add User
          </button>
        </form>
      </div>
      {/* User List */}
      {renderUserList()}
    </div>
  );
};

export default UserManagement;
