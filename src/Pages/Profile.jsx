import React, { use, useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { FaPencil } from 'react-icons/fa6';
import UpdateProfileModal from '../Utilities/UpdateProfileModal';

const Profile = () => {

    const { user } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className=' mx-auto'>
            <img className='rounded-full items-center mx-auto' src={user.photoURL} alt="" />
            <h3 className='font-bold text-2xl'>{user.displayName}</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-outline btn-success mt-3" ><FaPencil></FaPencil> Update Profile</button>

            <UpdateProfileModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </div>
    );
};

export default Profile;