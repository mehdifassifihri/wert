package com.example.reservationservices.services;

import com.example.reservationservices.dto.Reservationresponse;
import com.example.reservationservices.entities.Reservation;

import java.util.List;

public interface ReservationtsServices {
    List<Reservationresponse> getAllReservations();
    Reservation addReservation(Reservation reservation);
}
