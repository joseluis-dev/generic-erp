import React from 'react'
import Image from 'next/image'
import style from '#styles/components/Avatar/Avatar.module.css'
import Link from 'next/link'

const defaultPic = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684791341/ProfileImages/vczxestyqlmqgcwbr7c1.png'

function Avatar ({ user }: { user: any }): JSX.Element {
  return (
    <div className={style.avatarContainer}>
      <Link href='/user-profile'>
      {user.me.image != null
        ? <Image
            id={user.me.image.id}
            src={user.me.image?.url}
            alt='Logo del Usuario'
            width={30}
            height={30}
          />
        : <Image
            src={defaultPic}
            alt='Logo del Usuario'
            width={30}
            height={30}
          />}
        <small>{user.me.userName}</small>
      </Link>
    </div>
  )
}

export default Avatar
