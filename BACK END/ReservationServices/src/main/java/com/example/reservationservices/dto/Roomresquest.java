package com.example.reservationservices.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Roomresquest {
    private String id;
    private String name;
    private int maxNumber;
}
