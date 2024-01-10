import React, { useState, useEffect } from "react";
import Salle from "../assets/office.png";
import { Space, Table, Tag, Select } from "antd";
import axios from "axios";

const { Column, ColumnGroup } = Table;
const Salles = () => {
  const [name, setName] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [selectedFloorId, setSelectedFloorId] = useState('');
  const [rooms, setRooms] = useState([]);
  const [floors, setFloors] = useState([]);

  const handleFloorChange = (value) => {
    setSelectedFloorId(value);
    console.log("Selected room ID:", value); // or handle the ID as needed
  };

  const floorsOptions = floors.map(floor => {
  
    return {
      value: floor.id,
      label: `${floor.floorNumber}` 
    };
  });

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

  const fetchFloors = async () => {
    try {
      const response = await fetch("http://localhost:5033/api/floors");
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const data = await response.json();
      console.log(data);
      setFloors(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log(false);
    }
  };

  const handleSubmit=async()=>{
    const body = {
      "name":name,
      "maxNumber": maxNumber,
      "floorId": selectedFloorId,
      
  }
  try {
    
    const response = await axios.post("http://localhost:5136/api/rooms/create", body).then(()=>{
      fetchData();
    });
    
    console.log('Reservation successful:', response.data);
  } catch (err) {
    console.log(err.message || 'An error occurred while making the reservation.');
  } 
  }

  useEffect(() => {
    
    fetchFloors();
    fetchData();
    
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
              value={name}
              onChange={(e=>setName(e.target.value))}
            />
            <div className="flex items-center gap-2">
              <label className="text-sm">Max Personnes</label>
              <input
                className="outline-none bg-zinc-100 text-xs py-3 px-2 w-12 h-12 rounded-md text-center"
                type="text"
                value={maxNumber}
                onChange={(e=>setMaxNumber(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Etage</label>

              <Select
                defaultValue="Select floor"
                style={{
                  width: 120,
                }}
                options={floorsOptions}
                onChange={handleFloorChange}
              />
              <button onClick={handleSubmit} className="text-sm py-2 w-44 text-white bg-orange-400 rounded-md">
            Add
          </button>
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
