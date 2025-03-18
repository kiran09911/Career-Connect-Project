import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    location: "",
    skills: "",
    profile_picture: null
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/profile/${userId}`)
      .then(res => {
        console.log(res.data); // Log the response to check the structure
        setUser(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error("Error fetching user profile:", err));
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]); // Log the selected file to check
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => form.append(key, formData[key]));

    await axios.post(`http://localhost:5000/profile/update/${userId}`, form, { headers: { "Content-Type": "multipart/form-data" } })
      .then(res => {
        alert("Profile updated successfully!");
        setEditing(false);
      })
      .catch(err => alert("Error updating profile"));
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* Use a valid URL or fallback to default image */}
        <img
          src={user.profile_picture ? `http://localhost:5000/${user.profile_picture}` : "/default-profile.png"}
          alt="Profile"
          className="profile-pic"
        />
        <h2>{user.name}</h2>
        <p className="role">{user.role}</p>
        <button onClick={() => setEditing(!editing)} className="edit-btn">Edit Profile</button>
      </div>

      {editing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About Me"
          />
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
          />
          <input
            type="file"
            name="profile_picture"
            onChange={handleFileChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div className="profile-details">
          <p><strong>Location:</strong> {user.location || "Not specified"}</p>
          <p><strong>About Me:</strong> {user.about || "No bio available"}</p>
          <p><strong>Skills:</strong> {user.skills || "Not listed"}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
