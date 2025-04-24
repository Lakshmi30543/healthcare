package com.sdp.health.service;

import java.util.Map;

import com.razorpay.RazorpayException;

public interface RazorpayService {
	 Map<String, Object> createOrder(double amount, String currency) throws RazorpayException;
}

