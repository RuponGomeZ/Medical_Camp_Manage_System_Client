import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../Home/Home";
import AllCamps from "../Pages/AllCamps";
import Login from "../Authontications/Login";
import Register from "../Authontications/Register";
import CampDetails from "../Pages/CampDetails";
import AddACamp from "../Pages/AddACamp";
import PrivateRoute from "./PrivateRoute";
import ManageCamps from "../Pages/ManageCamps";
import Dashboard from "../layouts/Dashboard";
import Profile from "../Pages/Profile";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts></MainLayouts>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allCamps',
                element: <AllCamps></AllCamps>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/campDetails/:id',
                element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>,
            },

            {
                path: '/manage-camp',
                element: <ManageCamps></ManageCamps>
            },
        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'addCamp',
                element: <AddACamp></AddACamp>
            }, {
                path: 'profile',
                element: <Profile></Profile>
            }
        ]
    }
]);