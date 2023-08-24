import Image from 'next/image'
import React, { type ReactNode } from 'react'
import styles from '#styles/components/LandingCard/LandingCard.module.css'

interface LandingCardType {
  title: string
  children: ReactNode
  image: string
}

const LandingCard = ({ title, children, image }: LandingCardType): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <h2>{title}</h2>
        <hr />
      </div>
      <div className={styles.body}>
        {children}
        <Image
          src={image}
          width={200}
          height={200}
          alt={`Landing ${title} image`}
        />
      </div>
    </div>
  )
}

export default LandingCard
