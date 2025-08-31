"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDb from "@/db/connectDb"

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb()
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;

  var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  }

  let x = await instance.orders.create(options)
  await Payment.create({
    amount: amount / 100,
    oid: x.id,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  })

  return x
}

export const fetchUser = async (username) => {
  await connectDb()
  let u = await User.findOne({ username: username })
  if (!u) return null
  let user = await u.toObject({ flattenObjectIds: true })
  return user
}

export const fetchPayments = async (username) => {
  await connectDb()
  let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
  return p
}

//function to update username
export const updateProfile = async (data, oldusername) => {
  await connectDb()
  let ndata = Object.fromEntries(data)

  //if the username is being updated, check if username is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username })
    if (u) {
      return { error: "Username already exists" }
    }
    else {
      await User.updateOne({ email: ndata.email }, ndata)
      await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    }
  }
  else{
    await User.updateOne({ email: ndata.email }, ndata)
  }
}