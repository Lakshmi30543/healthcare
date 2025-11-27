package com.sdp.health.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.health.annotation.JwtRequired;
import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.model.Doctor;
import com.sdp.health.model.Patient;
import com.sdp.health.service.AdminService;
import com.sdp.health.service.DoctorService;
import com.sdp.health.service.PatientService;

@RestController
@RequestMapping("/eCare/admin")
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
    private AdminService adminService;

    @Autowired
    private DoctorService doctorService;
    
    @Autowired
    private PatientService patientService;
    
    
    @PostMapping("/addDoctor")
    @JwtRequired(roles = {"ADMIN"})
    public ResponseEntity<String> addDoctor(@RequestBody DoctorRegisterRequest request) {
        String result = adminService.addDoctorByAdmin(request);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/unapprovedDoctors")
    public ResponseEntity<List<Doctor>> getUnapprovedDoctors() {
        return ResponseEntity.ok(doctorService.getUnapprovedDoctors());
    }

    @GetMapping("/approvedDoctors")
    public ResponseEntity<List<Doctor>> getApprovedDoctors() {
        return ResponseEntity.ok(doctorService.getApprovedDoctors());
    }
 
    @PutMapping("/approveDoctor/{doctorId}")
    public ResponseEntity<String> approveDoctor(@PathVariable Long doctorId) {
        try {
            String response = doctorService.approveDoctor(doctorId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error approving doctor: " + e.getMessage());
        }
    }
    
    @PutMapping("/rejectDoctor/{doctorId}")
    public ResponseEntity<String> rejectDoctor(@PathVariable Long doctorId) {
        doctorService.rejectDoctor(doctorId);
        return ResponseEntity.ok("Doctor rejected and removed from the database");
    }
    
    @GetMapping("/viewAllPatients")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

   
    @DeleteMapping("/deletePatient/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
    
    //count
    @GetMapping("/approvedDoctorsCount")
    public ResponseEntity<Long> getApprovedDoctorsCount() {
        long approved = doctorService.countApprovedDoctors();
        return ResponseEntity.ok(approved);
    }

    @GetMapping("/pendingDoctorApprovalsCount")
    public ResponseEntity<Long> getPendingDoctorApprovalsCount() {
        long pending = doctorService.countPendingDoctorApprovals();
        return ResponseEntity.ok(pending);
    }

    @GetMapping("/totalPatients")
    public ResponseEntity<Long> getTotalPatients() {
        long totalPatients = patientService.countTotalPatients();
        return ResponseEntity.ok(totalPatients);
    }


//    @GetMapping("/appointmentsThisWeek")
//    public ResponseEntity<Long> getAppointmentsThisWeek() {
//        long appointments = patientService.countAppointmentsThisWeek();
//        return ResponseEntity.ok(appointments);
//    }
}