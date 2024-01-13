import React, { useEffect, useState } from "react";
import { TimePicker, DatePicker, Select } from "antd";
import axios from "axios";
import moment from 'moment';
import "../css/Homepage.css"


const Homepage = () => {
  const [name ,setName]=useState('')
  const [email ,setEmail]=useState('')
  const [phone ,setPhone]=useState('')
  const [rooms,setRooms]=useState([])
  const [selectedRoomId,setSelectedRoomId]=useState(null)
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeRange, setTimeRange] = useState([moment(), moment()]);
  
  const handleTimeChange = (time) => {
    setTimeRange(time);
  };

  const handleReservation=async()=>{
    const body = {
      "clientName": name,
      "phone": phone,
      "email": email,
      "date": selectedDate,
      "dateDebut": timeRange[0].format("HH:mm:ss"),
      "dateFin": timeRange[1].format("HH:mm:ss"),
      "room_id":selectedRoomId
  }
  try {
    
    const response = await axios.post("http://localhost:8283/reservation", body).then(()=>{
     setName("")
     setPhone("")
     setEmail("")
     setSelectedDate(null)
     setSelectedRoomId(null)
    });
    
    console.log('Reservation successful:', response.data);
  } catch (err) {
    console.log(err.message || 'An error occurred while making the reservation.');
  } 
  }

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    console.log("Selected Date:", dateString); 
  };
  
  const handleRoomChange = (value) => {
    setSelectedRoomId(value);
    console.log("Selected room ID:", value); 
  };
  
  const roomOptions = rooms.map(room => {
    const floorLabel = room.floor ? `Floor ${room.floor.floorNumber}` : 'Floor N/A';
  
    return {
      value: room.id,
      label: `${room.name} (${floorLabel})` 
    };
  });
  
  useEffect( () => {
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
  }, [])

  
  
  return (
    <div>
      <div className="flex bg-bgimage items-center justify-center gap-6 bg-cover bg-[url('/Users/MEHDI/Desktop/wert/FRONT END/src/assets/logo.png')] py-24 h-screen test">
        <p className="w-80 text-3xl text-white">
          Réservez Maintenant votre espace de Reunion Chez{" "}
          <span className="text-orange-500">Z</span>
          oom&Read
        </p>
        <div className="flex flex-col gap-3">
          <input
            className="outline-none bg-white text-sm py-2 px-4 w-44 rounded-md placeholder:text-xs"
            type="text"
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
          />
          <input
            className="outline-none bg-white text-sm py-2 px-4 w-44 rounded-md placeholder:text-xs"
            type="text"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
          <input
            className="outline-none bg-white text-sm py-2 px-4 w-44 rounded-md placeholder:text-xs"
            type="text"
            placeholder="Telephone"
            onChange={(e)=>setPhone(e.target.value)}
            value={phone}
          />
          <Select
            onChange={handleRoomChange}
            defaultValue="Select a room"
            style={{
              width: 250,
            }}
           
            options={roomOptions}
          />
          <DatePicker value={selectedDate} onChange={handleDateChange}  status="warning" />
          <TimePicker.RangePicker onChange={handleTimeChange}  status="warning" />
          <button onClick={handleReservation} className="text-sm py-2 w-44 text-white bg-orange-400 rounded-md">
            Reserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
