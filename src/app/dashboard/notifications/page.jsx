import React from 'react'
import Notifications from './_components/Notifications'
import { getNotificationsByReceiver } from '@/services/notificationServices'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
const page = async () => {
    const session = await getServerSession(authOptions)
    const notifications = await getNotificationsByReceiver(session?.user?.businessId)
  return (
    <div>
        <Notifications notifications={notifications}/>
    </div>
  )
}

export default page