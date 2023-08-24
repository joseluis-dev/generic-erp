import React from 'react'
import style from '#styles/components/NavBar/SessionButtons.module.css'
import MyButton from '#components/Buttons/MyButton'
import { SvgProfile } from '#assets/SvgProfie'
import { SvgLogout } from '#assets/SvgLogout'

function SesionButtons ({ isLoged, handleClick }: { isLoged: boolean, handleClick: any }): JSX.Element {
  return (
    <div className={style.buttonsContainer}>
      {!(isLoged ?? false)
        ? <>
            <MyButton href='/login' type='nav-primary'>
              <SvgProfile />
            </MyButton>
          </>
        : <MyButton type='nav-secondary' onClick={handleClick}>
            <SvgLogout />
          </MyButton>}
    </div>
  )
}

export default SesionButtons
