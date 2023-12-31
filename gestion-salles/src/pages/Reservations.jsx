import React, { useState, useEffect } from "react";
import Salle from "../assets/office.png";
import axios from "axios";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9091/reservation");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const data = await response.json();
        console.log(data);
        setReservations(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="bg-orange-400 text-center py-7">
        <p className="text-white">ROOMS MANAGEMENT</p>
      </div>
      <div className="flex">
        <div className="w-24 flex flex-col justify-between items-center h-screen bg-orange-400">
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center justify-center w-6 cursor-pointer">
              <img src={Salle} alt="" />
              <p className="text-sm text-white">Rooms</p>
            </div>
            <div className="flex flex-col items-center justify-center w-6 cursor-pointer">
              <img src={Salle} alt="" />
              <p className="text-sm text-white">Bookings</p>
            </div>
          </div>
          <img className="mb-44 w-8" src={Salle} alt="" />
        </div>
        <div className="w-full flex flex-col p-5">
          <Table className="mt-5" dataSource={reservations}>
            <Column title="Client" dataIndex="clientName" key="address" />
            <Column title="Phone" dataIndex="phone" key="address" />
            <Column title="Date Debut" dataIndex="address" key="address" />
            <Column title="Date Fin" dataIndex="address" key="address" />
            <Column
              title="Salle"
              dataIndex={["roomDetails", "name"]}
              key="address"
            />
            <Column
              title="Etage"
              dataIndex={["roomDetails", "floor", "floorNumber"]}
              key="address"
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
