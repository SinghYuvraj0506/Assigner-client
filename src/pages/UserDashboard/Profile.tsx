import DashboardWrapper from '@/lib/DashboardWrapper'
import React from 'react'

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

const NewComponent = DashboardWrapper(Profile,"Profile")

export default NewComponent;