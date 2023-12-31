import React, { useEffect } from "react";
import { TimePicker, DatePicker, Select } from "antd";

const Homepage = () => {
  useEffect(() => {
    
  }, [])
  
  return (
    <div>
      <div className="flex items-center justify-center gap-6 bg-cover bg-[url('/Users/mehdi/gestion-salles/src/assets/bg.jpg')] py-24 h-screen">
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
          />
          <input
            className="outline-none bg-white text-sm py-2 px-4 w-44 rounded-md placeholder:text-xs"
            type="text"
            placeholder="Email"
          />
          <input
            className="outline-none bg-white text-sm py-2 px-4 w-44 rounded-md placeholder:text-xs"
            type="text"
            placeholder="Telephone"
          />
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
          <DatePicker status="warning" />
          <TimePicker.RangePicker status="warning" />
          <button className="text-sm py-2 w-44 text-white bg-orange-400 rounded-md">
            Reserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
