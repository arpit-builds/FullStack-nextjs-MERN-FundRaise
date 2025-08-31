import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import connectDb from '@/db/connectDb'
import { notFound } from 'next/navigation'
import User from '@/models/User'

async function page({ params }) {
  await connectDb()
  let u = await User.findOne({ username: params.username })
  if (!u) {
    return notFound()
  }
  return (
    <>
      <PaymentPage username={params.username}/>
    </>
  )
}

export default page

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me a Chai`,
  }
}
