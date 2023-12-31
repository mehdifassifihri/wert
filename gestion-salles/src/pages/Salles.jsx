import React, { useState, useEffect } from "react";
import Salle from "../assets/office.png";
import { Space, Table, Tag, Select } from "antd";
import axios from "axios";

const { Column, ColumnGroup } = Table;
const Salles = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9091/api/rooms");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const data = await response.json();
        console.log(data);
        setRooms(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log(false);
      }
    };

    fetchData();
    console.log(rooms);
  }, []);

  return (
    <div>
      <div className="bg-orange-400 text-center py-7">
        <p className="text-white">BOOKINGS MANAGEMENT</p>
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
        <div className="w-full p-5">
          <div className="flex justify-center gap-3">
            <input
              placeholder="Name"
              className="outline-none bg-zinc-100 text-xs py-3 px-2 rounded-md"
              type="text"
            />
            <div className="flex items-center gap-2">
              <label className="text-sm">Max Personnes</label>
              <input
                className="outline-none bg-zinc-100 text-xs py-3 px-2 w-12 h-12 rounded-md text-center"
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Etage</label>

              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                ]}
              />
            </div>
          </div>
          <Table className="mt-5" dataSource={rooms}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="MaxNumber" dataIndex="maxNumber" key="maxNumber" />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Salles;
