// components/Dashboard.js
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const apiUrl = "https://server-beta-cyan.vercel.app/api/auth/user";
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User Data:", userData);
        setUser(userData);

        // Add a console log here to check if the fetchTasks function is called
        console.log("Fetching tasks...");
        fetchTasks(userData.tasks, token);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (taskIds, token) => {
    try {
      const apiUrl = `https://server-beta-cyan.vercel.app/api/tasks?taskIds=${taskIds.join(
        ","
      )}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const tasksData = await response.json();
        setTasks(tasksData);
      } else {
        console.error("Error fetching tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Your Tasks</p>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong>: {task.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Dashboard;
