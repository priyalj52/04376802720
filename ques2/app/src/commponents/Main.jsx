import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Main = () => {
    const [trainSchedule, setTrainSchedule] = useState([]);

    useEffect(() => {
      const fetchTrainSchedule = async () => {
        try {
          const response = await axios.get('http://localhost:8080/'); 
          setTrainSchedule(response.data);
        } catch (error) {
          console.log(error);
        }
      }; 
       fetchTrainSchedule();
    }, []);
    return (
   
      <div>
      <h1 className="text-2xl font-bold mb-4">Train Schedule</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Train Name</th>
            <th className="px-4 py-2">Train Number</th>
            <th className="px-4 py-2">Departure Time</th>
            <th className="px-4 py-2">Seats Available</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Delayed By</th>
          </tr>
        </thead>
        <tbody>
          {trainSchedule.map((schedule, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{schedule.trainName}</td>
              <td className="border px-4 py-2">{schedule.trainNumber}</td>
              <td className="border px-4 py-2">{`${schedule.departureTime.Hours}:${schedule.departureTime.Minutes}:${schedule.departureTime.Seconds}`}</td>
              <td className="border px-4 py-2">{`Sleeper: ${schedule.seatsAvailable.sleeper}, AC: ${schedule.seatsAvailable.AC}`}</td>
              <td className="border px-4 py-2">{`Sleeper: ${schedule.price.sleeper}, AC: ${schedule.price.AC}`}</td>
              <td className="border px-4 py-2">{schedule.delayedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Main
