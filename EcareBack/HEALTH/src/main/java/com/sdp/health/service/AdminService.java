package com.sdp.health.service;

import com.sdp.health.dto.DoctorRegisterRequest;

public interface AdminService {
    String addDoctorByAdmin(DoctorRegisterRequest request);
}
