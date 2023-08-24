import Link from 'next/link'
import React, { type HTMLProps } from 'react'
import styles from '#styles/components/Buttons/Buttons.module.css'

type Type = 'primary' | 'secondary' | 'danger' | 'nav-primary' | 'nav-secondary'
interface LinkProp extends HTMLProps<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement>
}
interface ButtonProp extends HTMLProps<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>
}
interface MyButtonProps {
  type: Type
}

const MyButton = ({ children, href, type, ...props }: LinkProp & ButtonProp & MyButtonProps): JSX.Element => {
  let classStyles

  switch (type) {
    case 'primary':
      classStyles = styles.primary
      break

    case 'secondary':
      classStyles = styles.secondary
      break

    case 'danger':
      classStyles = styles.danger
      break

    case 'nav-primary':
      classStyles = styles.navPrimary
      break

    case 'nav-secondary':
      classStyles = styles.navSecondary
      break

    default:
      break
  }

  return (
    <>
      {href != null
        ? <Link href={href} className={classStyles} {...props}>
            {children}
          </Link>
        : <button className={classStyles} {...props}>
            {children}
          </button>}
    </>
  )
}

export default MyButton
