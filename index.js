const express = require('express');
const axios = require('axios');
// const fetch = require('node-fetch');
// const auth-token=process.env.TOKEN

const app = express();
const PORT = 8080;
const url="http://104.211.219.98/train/trains"
app.get('/', async (req, res) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TOKEN}`
    , 
   
    };
    // const options = {
    //   method: 'GET',
    //   headers: headers,
    // };
    const response = await axios.get(url, { headers });
    const data = response.data;
 const currTime=new Date();
 const twelvehrsLater = new Date(currTime.getTime() + 12 * 60 * 60 * 1000);
 const thirtyMin = new Date(currTime.getTime() + 30 * 60 * 1000);

 const trainSchedule = data.filter(schedule => {
  const departureTimes = new Date();
  departureTimes.setHours(schedule.departureTime.Hours);
  departureTimes.setMinutes(schedule.departureTime.Minutes);
  departureTimes.setSeconds(schedule.departureTime.Seconds);

  return departureTimes > thirtyMin && departureTimes <= twelvehrsLater;
});
    // Sorting train schedules based on price in ascending order
    trainSchedule.data.sort((a, b) => a.price.sleeper - b.price.sleeper);

    // Sorting train schedules based on available tickets in descending order
    trainSchedule.sort((a, b) => b.seatsAvailable.sleeper - a.seatsAvailable.sleeper);

    // Sorting train schedules based on departure time in descending order
    trainSchedule.sort((a, b) => {
      const departureTimeA = new Date();
      departureTimeA.setHours(a.departureTime.Hours);
      departureTimeA.setMinutes(a.departureTime.Minutes);
      departureTimeA.setSeconds(a.departureTime.Seconds);

      const departureTimeB = new Date();
      departureTimeB.setHours(b.departureTime.Hours);
      departureTimeB.setMinutes(b.departureTime.Minutes);
      departureTimeB.setSeconds(b.departureTime.Seconds);

      return departureTimeB.getTime() - departureTimeA.getTime();
    });



    // res.json(data);
    res.json(trainSchedule);
    console.log("yaya")
  } catch (error) {
    console.log("error")
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
