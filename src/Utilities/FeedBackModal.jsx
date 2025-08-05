import { Dialog } from '@headlessui/react';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthProvider';


const FeedBackModal = ({ isOpen, setIsOpen, registration }) => {
    const { user } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const axiosPublic = useAxiosPublic()

    const onSubmit = async (data) => {
        const rating = data.rating;
        const description = data.description
        const feedBack = {
            rating: rating,
            comment: description,
            campId: registration.campId,
            participantId: registration.participantId,
            participantName: registration.participantName,
            participantPhotoURL: user.photoURL
        }

        const response = await axiosPublic.post('/feedback', feedBack, { withCredentials: true })
        if (response.data.insertedId) {
            toast.success("Rating added successfully!")
            setIsOpen(false)
        }

        console.log(registration);
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-gray-600 p-3 ml-6 shadow-lg">


                        <form className='flex flex-col   mx-auto  gap-5 text-center px-4'
                            onSubmit={handleSubmit(onSubmit)}
                        >

                            <div>
                                <p> Give rating based on your experience out of 5</p>
                                <select className='text-center w-96 py-2' {...register("rating")}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <p>Description</p>
                                <input
                                    type="text"
                                    maxLength={300}
                                    className="text-center w-96 py-2 textarea"
                                    placeholder='Describe your experience '
                                    {...register("description")}
                                />
                            </div>

                            <input className='btn btn-primary w-fit mx-auto' type="submit" />
                        </form>



                        <div className="flex justify-end gap-2">
                            <button className="btn hover:bg-red-600 btn-sm" onClick={() => setIsOpen(false)}>Cancel</button>
                            {/* <button className="btn btn-primary btn-sm" onClick={handleConfirm}>Confirm</button> */}
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default FeedBackModal;