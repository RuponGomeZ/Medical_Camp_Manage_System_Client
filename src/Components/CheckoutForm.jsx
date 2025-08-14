// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import '../Components/CheckoutForm.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CheckoutForm = ({ purchaseInfo, refetch, setIsOpen }) => {

    const axiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(false)

    const { data: paymentIntentData } = useQuery({
        queryKey: ['createPaymentIntent', purchaseInfo?.campId, purchaseInfo?.price],
        queryFn: async () => {
            const res = await axiosSecure.post('/create-payment-intent', purchaseInfo);
            return res.data;
        },
    });

    const clientSecret = paymentIntentData?.clientSecret;

    console.log(clientSecret);
    // useEffect(() => {
    //     if (purchaseInfo?.campId && purchaseInfo?.price) {
    //         getPaymentIntent()
    //     }
    // }, [])

    // console.log(clientSecret);

    // const getPaymentIntent = async () => {
    //     try {
    //         const { data } = await axiosSecure.post("/create-payment-intent", purchaseInfo)
    //         setClientSecret(data.clientSecret);
    //     }
    //     catch (err) {

    //     }
    // }

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        setProcessing(true)
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            setProcessing(false)
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setProcessing(false)
            return console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: purchaseInfo?.customer?.name,
                    email: purchaseInfo?.customer?.email,
                },
            },
        })
        console.log(purchaseInfo.registrationId);
        if (paymentIntent.status === 'succeeded') {

            try {
                const order = await axiosSecure.post('/order', { ...purchaseInfo, transactionId: paymentIntent?.id })

                if (order.data.insertedId) {
                    await axiosSecure.patch(`/payment-status-update?id=${purchaseInfo.registrationId}&status=Paid`);
                    toast.success('Order Successful!')
                    refetch()
                }
            } catch (err) {
                toast.error(err.response?.data || err.message);
                setProcessing(false)
            }
            finally {
                setProcessing(false)
                setIsOpen(false)
            }

        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-6">
            <div className="w-96">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary mt-4"
            >
                Pay ${purchaseInfo?.price}
            </button>
        </form>
    );
};

export default CheckoutForm