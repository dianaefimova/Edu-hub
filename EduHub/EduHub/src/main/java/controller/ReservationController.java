package controller;
import service.ReservationService;
import model.Reservation;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public-api/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // GET all reservations
    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    // POST a new reservation
    @PostMapping
    public boolean addReservation(@RequestBody Reservation reservation) {
        return reservationService.addReservation(reservation);
    }

    // PUT update a reservation by classroom name
    @PutMapping("/{classroomName}")
    public boolean updateReservation(@PathVariable String classroomName, @RequestBody Reservation updatedReservation) {
        return reservationService.updateReservation(classroomName, updatedReservation.isReserved());
    }

    @GetMapping("/fetch")
    public void fetchReservations() {
        reservationService.fetchReservationsFromApi();
    }

}