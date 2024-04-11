import { ChangeAuthModalStatus } from '@/app/features/general/GeneralSlice';
import React from 'react'
import { useDispatch } from 'react-redux';

const Main:React.FC = () => {
  const dispatch = useDispatch()
  return (
    <div>This is landing page of Aalas

      <button onClick={()=>dispatch(ChangeAuthModalStatus({value:true}))}>Login</button>
    </div>
  )
}

export default Main;