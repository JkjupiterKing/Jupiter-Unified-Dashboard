package Jupiter_Unified_Dashboard_api.controller;

import Jupiter_Unified_Dashboard_api.service.OTPService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;

@RequestMapping("/otp")
@CrossOrigin
@RestController
public class OTPController {

    @Autowired
    private OTPService otpService;

    // Endpoint to request OTP
    @PostMapping("/send")
    public String sendOTP(@RequestParam String email) {
        otpService.sendOTP(email);
        return "OTP sent to your email";
    }

    // Endpoint to verify OTP
    @PostMapping("/verify")
    public String verifyOTP(@RequestParam String email, @RequestParam String otp) {
        boolean isVerified = otpService.verifyOTP(email, otp);
        return isVerified ? "OTP verified successfully" : "Invalid or expired OTP";
    }
}