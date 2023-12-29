'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

function MyProfile() {
   const handleEdit = () => {}

   const handleDelete = () => {}
   return (
      <Profile
         name='My'
         desc='Welcome to your personalized profile page'
         data={[]}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   )
}

export default MyProfile