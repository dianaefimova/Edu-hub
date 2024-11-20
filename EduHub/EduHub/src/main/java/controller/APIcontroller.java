package controller;

import org.springframework.web.bind.annotation.PatchMapping;
import service.APIservice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
public class APIcontroller {

    private final APIservice apiService;

    public APIcontroller(APIservice apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/public-api")
    public String fetchPublicApiData() {
        return apiService.getAPIrespons();
    }

    @GetMapping("/public-api/reservations")
    public String fetchAPIreservtions() {
        return apiService.getAPIreservtions();
    }

    @GetMapping("/public-api/degrees")
    public String fetchAPIdegrees() {
        return apiService.getAPIdegrees();
    }

}