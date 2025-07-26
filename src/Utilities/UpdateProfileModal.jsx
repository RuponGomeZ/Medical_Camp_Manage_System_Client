import React, { useContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Providers/AuthProvider';
import { useForm } from "react-hook-form";
import LoadingSpinner from './LoadingSpinner';
import { Dialog } from '@headlessui/react';


const UpdateProfileModal = ({ isOpen, setIsOpen, }) => {

    const axiosPublic = useAxiosPublic()
    const { user, loading, setLoading, updateUserProfile } = useContext(AuthContext)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();





    const onSubmit = async (data) => {
        setLoading(true)
        let imageUrl;
        if (data.image?.[0]) {
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);
            imageUrl = await imgUpload(imageFile);
        }

        const campInfo = {
            displayName: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            photoURL: imageUrl,
        }

        updateUserProfile(data.displayName, imageUrl, data.phoneNumber)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error)
            })



        // if (res.data.modifiedCount) {
        //     console.log(res.data.modifiedCount);
        //     setIsOpen(false);
        //     toast.success(`Successfully updated ${campName}`)
        //     setLoading(false)
        //     refetch()
        // }
        // else {
        //     toast.error(res.data.message)

        // }
        setLoading(false)

    };

    if (loading) return <LoadingSpinner />

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4 mx-auto container">
                <Dialog.Panel className="w-96 max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-gray-600 p-3 ml-36 shadow-lg">



                    <form onSubmit={handleSubmit(onSubmit)} className="items-center mx-auto p-4 px-6">
                        <fieldset className="fieldset">

                            <h2 className='font-bold text-3xl text-center'>Update Your Profile</h2>

                            <label className="label">Name</label>
                            <input type="text" defaultValue={user?.displayName} {...register("name")} name="name" className="input" placeholder="Name" />
                            {errors.name && <span className="text-red-500">Name field is required</span>}

                            <label className="label mt-3">Update Profile Photo</label>
                            <div className=' w-full my-3'>
                                <input {...register('image')} type="file" className="file-input file-input-ghost" />
                            </div>

                            <label className="label">Phone Number</label>
                            <input type="text" defaultValue={user?.phoneNumber} {...register("phoneNumber")} name="phoneNumber" className="input" placeholder="Phone Number" />
                            {errors.name && <span className="text-red-500">Name field is required</span>}

                            <input className="btn btn-outline btn-success w-fit mx-auto mt-4" type="submit" value="Update" />
                        </fieldset>
                    </form >

                    <div className="flex justify-end gap-2">
                        <button className="btn hover:bg-red-600 btn-sm" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default UpdateProfileModal;