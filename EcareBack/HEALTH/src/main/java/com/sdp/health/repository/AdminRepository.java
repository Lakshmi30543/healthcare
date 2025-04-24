package com.sdp.health.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdp.health.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}