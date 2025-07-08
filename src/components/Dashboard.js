import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentRow from "./CommentRow";
import { saveState, getState } from "../utils/storage";
import { sortData } from "../utils/sort";

export default function Dashboard() {
  const [comments, setComments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(getState("search") || "");
  const [sortKey, setSortKey] = useState(getState("sortKey") || "");
  const [sortOrder, setSortOrder] = useState(getState("sortOrder") || "");
  const [page, setPage] = useState(getState("page") || 1);
  const [pageSize, setPageSize] = useState(getState("pageSize") || 10);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  useEffect(() => {
    let data = comments;

    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter((c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
      );
    }

    if (sortKey) {
      data = sortData(data, sortKey, sortOrder);
    }

    setFiltered(data);
    saveState("search", search);
    saveState("sortKey", sortKey);
    saveState("sortOrder", sortOrder);
    saveState("page", page);
    saveState("pageSize", pageSize);
  }, [comments, search, sortKey, sortOrder, page, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortOrder("");
        setSortKey("");
      } else {
        setSortOrder("asc");
      }
    }
    setPage(1);
  };

  return (
    <div className="container">
      <h2>Comments Dashboard</h2>
      <button onClick={() => navigate("/profile")}>Go to Profile</button>

      <div className="controls">
        <input
          type="text"
          value={search}
          placeholder="Search name or email"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select value={pageSize} onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(1);
        }}>
          <option value="10">10/page</option>
          <option value="50">50/page</option>
          <option value="100">100/page</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("postId")}>Post ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((c) => <CommentRow key={c.id} comment={c} />)}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
