package com.example.reservationservices.services;

import com.example.reservationservices.dto.Reservationresponse;
import com.example.reservationservices.dto.Roomresquest;
import com.example.reservationservices.entities.Reservation;
import com.example.reservationservices.repositories.ReservationsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
@Service
public class ReservationtsServicesImpl implements ReservationtsServices{
    ReservationsRepository reservationsRepository;

    RestTemplate restTemplate;

    public ReservationtsServicesImpl(ReservationsRepository reservationsRepository,RestTemplate restTemplate) {
        this.reservationsRepository = reservationsRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public List<Reservationresponse> getAllReservations() {
        List<Reservation> reservations = reservationsRepository.findAll();
        List<Reservationresponse> reservationresponses = new ArrayList<>();

        for (Reservation reservation : reservations) {
            Reservationresponse reservationresponse = new Reservationresponse();
            reservationresponse.setId(reservation.getId());
            reservationresponse.setClientName(reservation.getClientName());
            reservationresponse.setPhone(reservation.getPhone());
            reservationresponse.setEmail(reservation.getEmail());
            reservationresponse.setDate(reservation.getDate());
            reservationresponse.setDateDebut(reservation.getDateDebut());
            reservationresponse.setDateFin(reservation.getDateFin());
            Roomresquest roomresquest = restTemplate.getForObject("http://ASPNET-SERVICE/api/rooms/"+reservation.getRoom_id(), Roomresquest.class);
            Reservationresponse.RoomDetails roomDetails = new Reservationresponse.RoomDetails(roomresquest.getId(), roomresquest.getName(), roomresquest.getMaxNumber(),roomresquest.getFloor());
            reservationresponse.setRoomDetails(roomDetails);
            reservationresponses.add(reservationresponse);
        }
        return reservationresponses;
    }

    @Override
    public Reservation addReservation(Reservation reservation) {
        return reservationsRepository.save(reservation);
    }

    @Override
    public void deleteAll() {
        reservationsRepository.deleteAll();
    }
}
