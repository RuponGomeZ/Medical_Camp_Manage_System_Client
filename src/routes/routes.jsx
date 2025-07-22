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
                path: '/addCamp',
                element: <PrivateRoute><AddACamp></AddACamp></PrivateRoute>
            },
            {
                path: '/manage-camp',
                element: <ManageCamps></ManageCamps>
            }
        ]
    },
]);