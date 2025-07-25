import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Profile = () => {

    const { user } = useContext(AuthContext)

    return (
        <div>

        </div>
    );
};

export default Profile;