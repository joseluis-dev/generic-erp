
import Link from 'next/link'
import React from 'react'

function IconLink ({ icon, name, href, className, ...props }: { icon: any, name: string, href: string, className?: string }): JSX.Element {
  return (
    <Link href={href}>
      <li className={className} {...props}>
        <i>{icon}</i>
        <div>{name}</div>
      </li>
    </Link>
  )
}

export default IconLink
