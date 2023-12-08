'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { LogInIcon, LogOutIcon } from 'lucide-react'

import { Button } from './button'

export const AuthButton = () => {
  const { status } = useSession()

  const handleLogIn = async () => {
    await signIn()
  }

  const handleLogOut = async () => {
    await signOut()
  }

  return (
    <>
      {status === 'unauthenticated' && (
        <Button
          className="w-full justify-start gap-2"
          variant="default"
          onClick={handleLogIn}
        >
          <LogInIcon size={16} />
          Fazer login
        </Button>
      )}

      {status === 'authenticated' && (
        <Button
          className="w-full justify-start gap-2"
          variant="destructive"
          onClick={handleLogOut}
        >
          <LogOutIcon size={16} />
          Sair
        </Button>
      )}
    </>
  )
}
