import React, { use, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import avatarImg from '../../src/assets/images/placeholder.jpg'
import Dashboard from '../layouts/Dashboard';

const Navbar = () => {
    const { signOutUser, user } = useContext(AuthContext)


    const handleSignOut = () => {
        signOutUser()
            .then(res => {
                console.log(res);
            })
    }

    const links = (
        <div className='flex gap-5'>
            <Link to="/" key="home">Home</Link>
            <Link to="/allCamps" key="availableCamps">Available Camps</Link>
            <Link to="/manage-camp" key="manage-camp">Manage Camps</Link>
        </div>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?

                        <div className=" top-24 w-52 text-right">
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile'
                                        height='30'
                                        width='30'
                                    />
                                    <ChevronDownIcon className="size-4 fill-white/60" />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                >
                                    <MenuItem>
                                        <p className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                                            {user.displayName}
                                            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘E</kbd>
                                        </p>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={"/dashboard/profile"} className="group flex w-full  items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                                            Dashboard
                                            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘D</kbd>
                                        </Link>
                                    </MenuItem>
                                    <div className="my-1 h-px bg-white/5" />


                                    <div className="my-1 h-px bg-white/5" />
                                    <MenuItem>
                                        <button onClick={handleSignOut} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                                            Sign Out
                                            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘A</kbd>
                                        </button>
                                    </MenuItem>

                                </MenuItems>
                            </Menu>
                        </div>


                        :
                        <Link to={"/login"} className='btn'>Join Us</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;