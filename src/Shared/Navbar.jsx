import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import avatarImg from '../../src/assets/images/placeholder.jpg';

const Navbar = () => {
    const { signOutUser, user } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(res => {
                console.log(res);
            });
    };

    const links = (
        <div className='flex gap-5'>
            <NavLink to="/" key="home">Home</NavLink>
            <NavLink to="/allCamps" key="availableCamps">Available Camps</NavLink>
        </div>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={"/"} className=" font-bold text-xl">Medico+</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?
                        <div className="top-24 w-52 text-right">
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2 px-3 py-1.5 text-sm/6 font-semibold text-gray-800 shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-2 data-focus:outline-gray-200 data-hover:bg-gray-100 data-open:bg-gray-100">
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile'
                                        height='30'
                                        width='30'
                                    />
                                    <ChevronDownIcon className="size-4 fill-gray-600" />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="w-52 origin-top-right rounded-md border border-gray-200 bg-white p-1 text-sm/6 text-gray-800 shadow-lg transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                >
                                    <MenuItem>
                                        <p className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100">
                                            {user.displayName}
                                        </p>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={"/dashboard/profile"} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100">
                                            Dashboard
                                        </Link>
                                    </MenuItem>
                                    <div className="my-1 h-px bg-gray-200" />

                                    <div className="my-1 h-px bg-gray-200" />
                                    <MenuItem>
                                        <button
                                            onClick={handleSignOut}
                                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100 text-left"
                                        >
                                            Sign Out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                        :
                        <Link to={"/login"} className='btn btn-primary underline'>Join Us</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;