package com.sdp.health.service;

import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.dto.LoginRequest;
import com.sdp.health.dto.LoginResponse;
import com.sdp.health.dto.PatientRegisterRequest;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    String registerPatient(PatientRegisterRequest request);
    String registerDoctor(DoctorRegisterRequest request);
}