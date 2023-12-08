'use client'

import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Separator } from './separator'

export const UserAvatar = () => {
  const { status, data } = useSession()

  if (status === 'unauthenticated' && data === null) {
    return <></>
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 py-4">
        <Avatar>
          <AvatarFallback>{data?.user?.name?.[0].toUpperCase()}</AvatarFallback>
          {data?.user?.image && (
            <AvatarImage src={data.user.image} alt={data.user.name!} />
          )}
        </Avatar>
        <div className="flex flex-col">
          <p className="text-base font-medium">{data?.user?.name}</p>
          <p className="text-xs font-medium opacity-75">Seja bem vindo</p>
        </div>
      </div>
      <Separator />
    </div>
  )
}
