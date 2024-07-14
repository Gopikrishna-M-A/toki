'use client'
import React from 'react'
import MessageCard from './MessageCard'

const Notifications = ({notifications}) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {notifications.map((notification,index) => (
        <MessageCard key={index} notification={notification} />
      ))}
    </div>
  )
}

export default Notifications