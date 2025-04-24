package com.sdp.health.dto;

public class LoginResponse {
    private String message;
    private String role;
    private Long Id;

    public LoginResponse(String message, String role, Long Id) {
        this.message = message;
        this.role = role;
        this.Id = Id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }
}

