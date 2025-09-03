"use client"
import React from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchUser, fetchPayments, initiate } from '@/actions/useractions'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
  const [currentUser, setCurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    getData()
    if (searchParams.get("paymentdone") == "true") {
      toast.info('Thanks for your donation!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    router.push(`/${username}`)
  }, [])


  const getData = async () => {
    let u = await fetchUser(username)
    setCurrentUser(u)
    let dbpayments = await fetchPayments(username)
    setPayments(dbpayments)
  }

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. 
      "currency": "INR",
      "name": "Fund-Raise", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    }
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  if (!currentUser || Object.keys(currentUser).length === 0) {
    return <div className="text-center text-red-500 font-bold mt-10">User not found</div>;
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className='cover w-full relative'>
        <img className='object-cover w-full h-48 md:h-[350px]' src={currentUser.coverpic} alt="" />
        <div className='absolute -bottom-20 right-[34%] md:right-[46%] w-40 h-40'>
          <img className='object-cover border-white border-2 w-full h-full rounded-full' src={currentUser.profilepic} alt="" />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center gap-2 my-24 font-bold">
        <div className="font-bold text-lg">
          @{currentUser.name}
        </div>
        <div className="text-slate-400">
          Let&apos;s help {currentUser.name} to get some funds
        </div>
        <div className='text-slate-400'>
          {payments.length} payments . ₹{payments.reduce((acc, item) => acc + item.amount, 0)} raised
        </div>
        <div className="payment flex md:flex-row flex-col gap-3 w-[80%] mt-11">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
            {/* show list of all supporters as leaderboard */}
            <h2 className='text-2xl font-bold my-5'>Top 5 Supporters</h2>
            <ul className='mx-5 text-lg'>
              {payments.length === 0 && <li>No payments to show</li>}
              {payments.map((item, i) => {
                if (i < 5) { // Limit to top 5 supporters{
                return <li key={i} className='my-4 flex items-center gap-2'>
                  <img width={33} src="avatar.gif" alt="" />
                  <span>{item.name} donated <span className='font-bold'>₹{item.amount}</span> with a message &quot;{item.message}&quot;</span>
                </li> }
              })}
            </ul>
          </div>
          <div className="make-payment w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className='text-2xl font-bold my-5'>Supporters</h2>
            <div className="flex flex-col gap-2">
              {/* input for name and message */}
              <input onChange={handleChange} name='name' value={paymentform.name} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
              <input onChange={handleChange} name='message' value={paymentform.message} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
              <input onChange={handleChange} name='amount' value={paymentform.amount} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
              <button onClick={() => pay(Number(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium disabled:from-purple-100 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={paymentform.name?.length == 0 || paymentform.message?.length == 0 || paymentform.amount?.length == 0 || isNaN(Number(paymentform.amount)) }>Pay</button>
            </div>
            <div className="flex md:flex-row flex-col gap-2 mt-5">
              <button className="bg-slate-800 disabled:bg-slate-700 p-3 rounded-lg" onClick={() => pay(1000)} disabled={paymentform.name?.length == 0 || paymentform.message?.length == 0}>Pay ₹10</button>
              <button className="bg-slate-800 disabled:bg-slate-700 p-3 rounded-lg" onClick={() => pay(2000)} disabled={paymentform.name?.length == 0 || paymentform.message?.length == 0}>Pay ₹20</button>
              <button className="bg-slate-800 disabled:bg-slate-700 p-3 rounded-lg" onClick={() => pay(3000)} disabled={paymentform.name?.length == 0 || paymentform.message?.length == 0}>Pay ₹30</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PaymentPage
