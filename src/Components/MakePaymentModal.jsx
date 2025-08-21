import React, { useContext } from 'react';
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';




const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)


const MakePaymentModal = ({ setIsOpen, isOpen, registration, refetch }) => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const purchaseInfo = {
        customer: {
            name: user.displayName,
            email: user.email,
            image: user.photoURL
        },
        campId: registration.campId,
        price: registration.campFees,
        registrationId: registration._id,
        campName: registration.campName,
        registerId: registration._id,
        confirmationStatus: "pending"
    }


    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
                <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-gray-600 p-3 ml-6 shadow-lg">


                    <h2 className='text-2xl'>Complete your payment to join <span className='text-green-600 font-bold mb-20'>{registration.campName}</span></h2>
                    <div className='my-5'>

                        <p className='font-bold'>User: {user.displayName}</p>
                        <p className='font-bold'>email: {user.email}</p>
                        <p className='font-bold'>Camp Fee: ${registration?.campFees}</p>

                    </div>


                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            purchaseInfo={purchaseInfo}
                            refetch={refetch}
                            setIsOpen={setIsOpen}
                        ></CheckoutForm>
                    </Elements>

                    <div className="flex justify-end gap-2">
                        <button className="btn hover:bg-red-600 btn-sm"
                            onClick={() => setIsOpen(false)}
                        >Cancel</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default MakePaymentModal;