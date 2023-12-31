package com.example.reservationservices.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservationresponse {
        private int id;
        private String clientName;
        private String phone;
        private String email;
        private LocalDateTime dateDebut;
        private LocalDateTime dateFin;
        private RoomDetails roomDetails;
        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class RoomDetails {

            private String id;

            private String name;
            private int maxNumber;
        }
}