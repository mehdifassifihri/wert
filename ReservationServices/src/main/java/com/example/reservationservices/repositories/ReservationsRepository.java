package com.example.reservationservices.repositories;

import com.example.reservationservices.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationsRepository extends JpaRepository<Reservation,Integer> {
}
