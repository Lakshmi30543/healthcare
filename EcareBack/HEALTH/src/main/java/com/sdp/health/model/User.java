package com.sdp.health.model;

import jakarta.persistence.*;

@MappedSuperclass
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "fullName", nullable = false, length = 50)
    protected String fullName;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    protected String username;

    @Column(name = "password", nullable = false, length = 50)
    protected String password;

    @Column(name = "dob", nullable = false, length = 50)
    protected String dob;

    @Column(name = "email", unique = true, nullable = false, length = 50)
    protected String email;

    @Column(name = "contact", unique = true, nullable = false, length = 50)
    protected String contact;

    @Column(name = "gender", nullable = false, length = 50)
    protected String gender;

    @Column(name = "role", nullable = false, length = 50)
    protected String role;
    
    
    
    

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
