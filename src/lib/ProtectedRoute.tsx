
import React, { PropsWithChildren, useEffect } from 'react'
import useAuth from './hooks/useAuth'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = PropsWithChildren

const ProtectedRoute = ({children}:ProtectedRouteProps) => {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if(!isAuthenticated){
        navigate("/",{replace:true})
      }

    }, [isAuthenticated,navigate])
    


  return children;
}

export default ProtectedRoute