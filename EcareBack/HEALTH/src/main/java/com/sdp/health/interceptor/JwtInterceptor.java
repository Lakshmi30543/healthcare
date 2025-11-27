package com.sdp.health.interceptor;

import com.sdp.health.annotation.JwtRequired;
import com.sdp.health.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        // Allow OPTIONS requests (CORS preflight)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        
        // Check if handler is a method with @JwtRequired annotation
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            JwtRequired jwtRequired = handlerMethod.getMethodAnnotation(JwtRequired.class);
            
            if (jwtRequired != null) {
                // Extract token from Authorization header
                String authHeader = request.getHeader("Authorization");
                
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\": \"Missing or invalid Authorization header\"}");
                    return false;
                }
                
                String token = authHeader.substring(7);
                
                // Validate token
                if (!jwtUtil.validateToken(token)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\": \"Invalid or expired token\"}");
                    return false;
                }
                
                // Check role if specified
                String[] requiredRoles = jwtRequired.roles();
                if (requiredRoles.length > 0) {
                    String userRole = jwtUtil.extractRole(token);
                    boolean hasRole = Arrays.asList(requiredRoles).contains(userRole);
                    
                    if (!hasRole) {
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        response.getWriter().write("{\"error\": \"Insufficient permissions\"}");
                        return false;
                    }
                }
                
                // Store username in request attribute for use in controller
                String username = jwtUtil.extractUsername(token);
                request.setAttribute("username", username);
            }
        }
        
        return true;
    }
}
