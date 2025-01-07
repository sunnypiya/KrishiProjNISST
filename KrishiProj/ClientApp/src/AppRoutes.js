import { AppointmentLetter } from "./components/AppointmentLetter";
import AppointmentsDetails from "./components/AppointmentsDetails";
import { Configuration } from "./components/Configuration";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Registration } from "./components/Registration";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/scscp-registration',
        element: <Registration />
    },
    {
        path: '/svs-appointment-lettter/:code',
        element: <AppointmentLetter />
    }
    ,
    {
        path: '/svs-data/:pass',
        element: <AppointmentsDetails/>
    }
    ,
    {
        path: '/CommonConfig',
        element: <Configuration />
    }
];

export default AppRoutes;
