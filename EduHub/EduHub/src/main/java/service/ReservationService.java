package service;
import model.Reservation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    private final WebClient webClient;
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    private List<Reservation> reservations = new ArrayList<>();

    public ReservationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://mocki.io/v1").build();
    }

    // Fetch reservations from API
    public void fetchReservationsFromApi() {
        try {
            logger.info("Fetching reservations from external API...");
            // Get request
            Mono<Reservation[]> response = this.webClient.get()
                    .uri("/5bf52805-a7ad-42fe-ab14-e546dfd363c5")
                    .retrieve()
                    .bodyToMono(Reservation[].class);

            Reservation[] fetchedReservations = response.block();

            if (fetchedReservations != null) {
                for (Reservation reservation : fetchedReservations) {
                    reservations.add(reservation);
                }
            }
            logger.info("Reservations fetched successfully");

        } catch (WebClientResponseException e) {
            logger.error("Error fetching API data: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
        }
    }

    public List<Reservation> getAllReservations() {
        return reservations;
    }

    // Update reservation status by classroom name
    public boolean updateReservation(String classroomName, boolean isReserved) {
        for (Reservation reservation : reservations) {
            if (reservation.getClassroomName().equals(classroomName)) {
                reservation.setReserved(isReserved);  // Update reservation status
                return true;
            }
        }
        return false;
    }

    public boolean addReservation(Reservation reservation) {
        return reservations.add(reservation);
    }

}