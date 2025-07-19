// Modal.jsx
import React, { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';


const Modal = ({ isOpen, setIsOpen, camp }) => {

    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user, loading, setLoading } = useContext(AuthContext)

    if (loading) return <LoadingSpinner />

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const {
        campName, dateTime, location,
        healthcareProfessional, participantCount,
        image, campFees, _id
    } = camp;

    const onSubmit = async (data) => {
        setLoading(true)
        // to do check index.js chatgpt data structure make api

        const registerInfo = {
            campName: campName,
            campId: _id,
            //  TODO participantId:
            participantEmail: data.participantEmail,
            phone: data.phoneNumber,
            emergencyContact: data.emergencyContact,
            campFees: campFees,

        }

        const res = await axiosPublic.post('/registrations', registerInfo)
        if (res.data.insertedId) {
            setLoading(false)

            // TODO patch api to server make participant count +1

            setIsOpen(false);
            toast.success(`Successfully Applied to Join ${campName}`)
            navigate('/allCamps')
        }
        console.log(data);

    };




    // console.log(healthcareProfessional, user.displayName);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className=" w-full max-w-fit rounded bg-gray-600 p-3 ml-6 shadow-lg">

                    <form className='flex flex-col   mx-auto  gap-5 text-center px-4'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h3 className='font-bold text-3xl'>{campName}</h3>

                        {/* Camp Fee */}
                        <div>
                            <p>Camp Fee</p>
                            <input type='number' value={campFees} className='text-center w-96 py-2'  {...register("campFee", { required: true })} />
                        </div>



                        {/* Location */}
                        <div>
                            <p>Camp location</p>
                            <input className='text-center w-96 py-2' value={location}  {...register("location", { required: true })} />
                        </div>


                        {/* Health Care Professional */}
                        <div>
                            <p>Health Care Professional Name</p>
                            <input className='text-center w-96 py-2' value={healthcareProfessional} placeholder='Health Care Professional'  {...register("healthCareProfessional", { required: true })} />
                        </div>

                        {/* Participant Name */}
                        <div>
                            <p>Participant Name</p>
                            <input className='text-center w-96 py-2' value={user?.displayName} placeholder='Health Care Professional'  {...register("participant", { required: true })} />
                        </div>


                        {/*Participant Email  */}
                        <div>
                            <p>Participant Email</p>
                            <input className='text-center w-96 py-2' value={user.email} placeholder='Description'  {...register("participantEmail", { required: true })} />
                        </div>


                        {/* Age */}
                        <div>
                            <p>Your Age</p>
                            <input className='text-center w-96 py-2' type='number' placeholder='Your Age'  {...register("age", { required: true })} />
                        </div>


                        {/*Phone Number  */}
                        <div>
                            <p>Your Phone Number</p>
                            <input className='text-center w-96 py-2' placeholder='Your Phone Number'  {...register("phoneNumber", { required: true })} />
                        </div>


                        {/* Gender */}
                        <div>
                            <p> Select Your Gender</p>
                            <select className='text-center w-96 py-2' {...register("gender")}>
                                <option value="female">female</option>
                                <option value="male">male</option>
                                <option value="other">other</option>
                            </select>
                        </div>


                        {/*Emergency Contact  */}
                        <div>
                            <p>Emergency Contact </p>
                            <input className='text-center w-96 py-2'
                                type='number'
                                placeholder='Emergency Contact '  {...register("emergencyContact ", { required: true })} />
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
    );
};

export default Modal;
