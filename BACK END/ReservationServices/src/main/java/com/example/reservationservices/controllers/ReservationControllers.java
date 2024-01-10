package com.example.reservationservices.controllers;

import com.example.reservationservices.dto.Reservationresponse;
import com.example.reservationservices.entities.Reservation;
import com.example.reservationservices.services.ReservationtsServicesImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin()
public class ReservationControllers {
    ReservationtsServicesImpl reservationtsServices;

    public ReservationControllers(ReservationtsServicesImpl reservationtsServices) {
        this.reservationtsServices = reservationtsServices;
    }
    @GetMapping()
    ResponseEntity<List<Reservationresponse>> getAllReservations(){
        List<Reservationresponse> reservationresponses = reservationtsServices.getAllReservations();
        return  ResponseEntity.ok(reservationresponses);
    }
    @CrossOrigin
    @PostMapping()
    ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation){
        Reservation reservation1 = reservationtsServices.addReservation(reservation);
        return ResponseEntity.ok(reservation1);
    }
    @DeleteMapping()
    ResponseEntity<?> deleteAll(){
        reservationtsServices.deleteAll();
        return ResponseEntity.ok().build();
    }

}
