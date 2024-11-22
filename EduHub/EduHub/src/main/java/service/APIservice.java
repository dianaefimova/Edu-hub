package service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class APIservice {

    private final WebClient webClient;
    private static final Logger logger = LoggerFactory.getLogger(APIservice.class);

    private final WebClient reservation;
    private static final Logger logReservations = LoggerFactory.getLogger(APIservice.class);

    private final WebClient degrees;
    private static final Logger logDegrees = LoggerFactory.getLogger(APIservice.class);

// connection to degrees api
        public APIservice(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://mocki.io/v1").build();
        this.reservation = webClientBuilder.baseUrl("https://mocki.io/v1").build();
        this.degrees = webClientBuilder.baseUrl("https://mocki.io/v1").build();
    }



    public String getAPIrespons() {
        try {
            logReservations.info("Sending request to external API...");
            Mono<String> response = this.webClient.get()
                    .uri("/4f048e3a-052a-40cd-803e-296d54b99ed9")
                    .retrieve()
                    .bodyToMono(String.class);
            String result = response.block();
            logReservations.info("API Response received: {}", result);

            return result;

        } catch (WebClientResponseException e) {
            logReservations.error("Error fetching API data: {}", e.getMessage());
            return "Error fetching data from external API: " + e.getMessage();
        } catch (Exception e) {
            logReservations.error("Unexpected error: {}", e.getMessage());
            return "Unexpected error occurred: " + e.getMessage();
        }
    }

    public String getAPIreservtions() {
        try {
            logger.info("Sending request to external API...");
            Mono<String> response = this.reservation.get()
                    .uri("/5bf52805-a7ad-42fe-ab14-e546dfd363c5")
                    .retrieve()
                    .bodyToMono(String.class);
            String result = response.block();
            logger.info("API Response received: {}", result);

            return result;

        } catch (WebClientResponseException e) {
            logger.error("Error fetching API data: {}", e.getMessage());
            return "Error fetching data from external API: " + e.getMessage();
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            return "Unexpected error occurred: " + e.getMessage();
        }
    }

    public String getAPIdegrees() {
        try {
            logDegrees.info("Sending request to external API...");
            Mono<String> response = this.degrees.get()
                    .uri("/987b7faa-c7d9-4107-8365-183b62e0eced")
                    .retrieve()
                    .bodyToMono(String.class);
            String result = response.block();
            logDegrees.info("API Response received: {}", result);

            return result;

        } catch (WebClientResponseException e) {
            logDegrees.error("Error fetching API data: {}", e.getMessage());
            return "Error fetching data from external API: " + e.getMessage();
        } catch (Exception e) {
            logDegrees.error("Unexpected error: {}", e.getMessage());
            return "Unexpected error occurred: " + e.getMessage();
        }
    }
}