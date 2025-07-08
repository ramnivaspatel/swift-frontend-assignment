import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  return (
    <div className="container">
      <h2>User Profile</h2>
      {user && (
        <div className="card">
          <p><b>ID:</b> {user.id}</p>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Address:</b> {user.address.street}, {user.address.city}</p>
        </div>
      )}
      <button onClick={() => navigate("/")}>Back to Dashboard</button>
    </div>
  );
}
