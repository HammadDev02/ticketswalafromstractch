import express from "express";
const app = express();  
import companyRoute from './routes/companyRoute.js'
import inventoryCatRoute from './routes/inventoryCatRoute.js'
import inventoryRoute from './routes/inventoryRoute.js'
import terminalRoute from './routes/terminalRoute.js'
import usersRoute from './routes/usersRoute.js'
import driverRoute from './routes/driverRoute.js'
import routesOfBusRoute from './routes/routesOfBusRoute.js'
import routesOfBusRouteStop from './routes/routesOfBusRouteStop.js'
import scheduleRoute from './routes/scheduleRoute.js'
import stopsScheduleRoute from './routes/stopsScheduleRoute.js'
import authRoute from './routes/authRoute.js'



// middleware
app.use(express.json())
app.use("/api", companyRoute);
app.use("/api", inventoryCatRoute);
app.use("/api", inventoryRoute);
app.use("/api", terminalRoute);
app.use("/api", usersRoute);
app.use("/api", driverRoute);
app.use("/api", routesOfBusRoute);
app.use("/api", routesOfBusRouteStop);
app.use("/api", scheduleRoute);
app.use("/api", stopsScheduleRoute);
app.use("/api", authRoute);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})  