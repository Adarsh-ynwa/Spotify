import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/clerk-react'
import { LayoutDashboard } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import SignInOAuthButtons from './SignInOAuthButtons'
import { useAuthStore } from '@/stores/useAuthStore'

const TopBar = () => {
    const {isAdmin}=useAuthStore();
    console.log(isAdmin)
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex gap-2 items-center'>
        MeraMusic
      </div>
      <div className='flex gap-4 items-center'>

        {isAdmin && (
            <Link to={"/admin"}>
            <LayoutDashboard className="size-4 mr-2"/>
            Admin Dashboard
            </Link>
        )} 

        <SignedIn>
            <SignOutButton/>
        </SignedIn>


        <SignedOut>
            <SignInOAuthButtons/>
        </SignedOut>
        
            
        
      

      </div>
    </div>
  )
}

export default TopBar
