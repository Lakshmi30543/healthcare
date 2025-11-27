package com.sdp.health.controller;

import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.dto.LoginRequest;
import com.sdp.health.dto.LoginResponse;
import com.sdp.health.dto.PatientRegisterRequest;
import com.sdp.health.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/eCare/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register/patient")
    public ResponseEntity<String> registerPatient(@RequestBody PatientRegisterRequest request) {
        return ResponseEntity.ok(authService.registerPatient(request));
    }

    @PostMapping("/register/doctor")
    public ResponseEntity<String> registerDoctor(@RequestBody DoctorRegisterRequest request) {
        return ResponseEntity.ok(authService.registerDoctor(request));
    }
}