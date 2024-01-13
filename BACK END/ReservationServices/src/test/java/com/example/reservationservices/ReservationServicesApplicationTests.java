package com.example.reservationservices;

import com.example.reservationservices.dto.Reservationresponse;
import com.example.reservationservices.services.ReservationtsServicesImpl;
import org.hamcrest.collection.IsEmptyCollection;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

@SpringBootTest
class ReservationServicesApplicationTests {

@Autowired
    ReservationtsServicesImpl services;
    @Test
    void testListReservqtionNotNull() {
        Assert.assertNotNull(services.getAllReservations());
    }



        @Test
    void testListReservqtionNotEmpty(){
        Assert.assertNotEquals(services.getAllReservations() , IsEmptyCollection.empty());
    }

    @Test
    void testReturnedValuesContainrsReservationObject(){
        List<Reservationresponse> reservationresponses = services.getAllReservations();

        Assert.assertTrue(reservationresponses.get(0) instanceof Reservationresponse );
    }

}
