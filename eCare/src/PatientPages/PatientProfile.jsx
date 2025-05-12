import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import config from '../config'; 
import "./styles/pprofile.css";

const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%2329cabb' d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v38c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z'/%3E%3C/svg%3E";

export default function PatientProfile() {
  const [patient, setPatient] = useState({
    fullName: '',
    username: '',
    password: '',
    dob: '',
    email: '',
    contact: '',
    gender: '',
    role: 'PATIENT',
    bloodGroup: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const patientId = sessionStorage.getItem('userId');
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (patientId) {
      const fetchPatientData = async () => {
        try {
          const response = await axios.get(`${config.url}/eCare/patient/profile/${patientId}`);
          setPatient(response.data);

          // Fetch profile picture URL (returns path as string)
          const profilePicUrlRes = await axios.get(`${config.url}/eCare/patient/profilepictureurl/${patientId}`);
          let profilePicUrl = profilePicUrlRes.data;
          console.log("Profile image URL from backend:", profilePicUrl);

          // If the path is not absolute, prepend backend URL
          if (profilePicUrl && !profilePicUrl.startsWith('http')) {
            profilePicUrl = profilePicUrl; // e.g., "/profile_pics/filename.jpg"
          }

          setAvatar(profilePicUrl || defaultAvatar);
          setFile(null); // Reset file so preview does not persist after reload
        } catch (error) {
          console.error("Error fetching patient or image:", error);
          setAvatar(defaultAvatar);
          setFile(null);
        } finally {
          setLoading(false);
        }
      };

      fetchPatientData();
    } else {
      setLoading(false);
    }
  }, [patientId, isEditable]); // Add isEditable to dependencies to refresh after editing

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    const formDataToSend = new FormData();
    formDataToSend.append("patientDetails", new Blob([JSON.stringify(patient)], { type: "application/json" }));
    if (file) {
      formDataToSend.append("file", file);
    }
    axios
      .put(`${config.url}/eCare/patient/updatepatient/${patientId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert('Profile updated successfully!');
        setIsEditable(false);
        setFile(null); // This triggers useEffect to reload image from backend
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Error updating profile!');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Only for previewing new image
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageClick = () => {
    if (isEditable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pprofile-container">
      <div className="pprofile-content">
        <div className="pprofile-header">
          <h1>My Profile</h1>
          {!isEditable && (
            <button
              onClick={() => setIsEditable(true)}
              className="pprofile-edit-btn"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="pprofile-card">
          <div className="pprofile-basic-info">
            <div
              className={`pprofile-image-edit${isEditable ? ' editable' : ''}`}
              onClick={handleImageClick}
              style={{ cursor: isEditable ? 'pointer' : 'default' }}
            >
              <img
                src={typeof avatar === 'string' ? avatar : defaultAvatar}
                alt={patient.fullName}
                className="pprofile-avatar"
                onError={(e) => { e.target.src = defaultAvatar; }}
              />
              {isEditable && (
                <div className="pprofile-image-overlay">
                  <span className="pprofile-camera-icon" role="img" aria-label="camera">📷</span>
                  <span className="pprofile-image-upload-hint">Change</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <div className="pprofile-details">
              <div className="pprofile-name">{patient.fullName || "N/A"}</div>
              <div className="pprofile-title">{patient.username || "N/A"}</div>
              <div className="pprofile-contact">
                <div className="pprofile-contact-item"><strong>Email:</strong> {patient.email || "N/A"}</div>
                <div className="pprofile-contact-item"><strong>Contact:</strong> {patient.contact || "N/A"}</div>
                <div className="pprofile-contact-item"><strong>Gender:</strong> {patient.gender || "N/A"}</div>
                <div className="pprofile-contact-item"><strong>Blood Group:</strong> {patient.bloodGroup || "N/A"}</div>
              </div>
            </div>
          </div>
          <div className="pprofile-sections">
            {!isEditable ? (
              <div className="pprofile-section">
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Full Name:</div>
                  <div className="pprofile-info-value">{patient.fullName || "N/A"}</div>
                </div>
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Username:</div>
                  <div className="pprofile-info-value">{patient.username || "N/A"}</div>
                </div>
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Date of Birth:</div>
                  <div className="pprofile-info-value">{patient.dob || "N/A"}</div>
                </div>
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Email:</div>
                  <div className="pprofile-info-value">{patient.email || "N/A"}</div>
                </div>
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Contact:</div>
                  <div className="pprofile-info-value">{patient.contact || "N/A"}</div>
                </div>
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Gender:</div>
                  <div className="pprofile-info-value">{patient.gender || "N/A"}</div>
                </div>
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Blood Group:</div>
                  <div className="pprofile-info-value">{patient.bloodGroup || "N/A"}</div>
                </div>
                <div className="pprofile-info-row">
                  <div className="pprofile-info-label">Address:</div>
                  <div className="pprofile-info-value">{patient.address || "N/A"}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pprofile-edit-mode">
                <div className="pprofile-section">
                  <div className="pprofile-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={patient.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={patient.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={patient.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Date of Birth</label>
                    <input
                      type="text"
                      name="dob"
                      value={patient.dob}
                      onChange={handleChange}
                      placeholder="Date of Birth"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={patient.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Contact</label>
                    <input
                      type="text"
                      name="contact"
                      value={patient.contact}
                      onChange={handleChange}
                      placeholder="Contact"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Gender</label>
                    <input
                      type="text"
                      name="gender"
                      value={patient.gender}
                      onChange={handleChange}
                      placeholder="Gender"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Blood Group</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={patient.bloodGroup}
                      onChange={handleChange}
                      placeholder="Blood Group"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={patient.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="pprofile-form-control"
                    />
                  </div>
                  <div className="pprofile-action-buttons">
                    <button type="submit" className="pprofile-save-btn">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="pprofile-cancel-btn"
                      onClick={() => setIsEditable(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
