import { SvgHouse } from '#assets/SvgHouse'
import { SvgClient } from '#assets/SvgClients'
import { useMutationUser } from '#hooks/useUser'
import React from 'react'
import IconLink from './IconLink'
import { SvgProducts } from '#assets/SvgProducts'
import { SvgUsers } from '#assets/SvgUsers'
import style from '#styles/components/ControlBar/ControlBar.module.css'
import { SvgSettings } from '#assets/SvgSettings'
import { SvgCash } from '#assets/SvgCash'
import { SvgProvider } from '#assets/SvgProvider'
import { SvgPurchase } from '#assets/SvgPurchase'
import { useRouter } from 'next/router'

function ControlBar ({ children }: { children: JSX.Element }): JSX.Element {
  const router = useRouter()
  const page = router.route
  const { isLoged } = useMutationUser()

  const getActiveLinkStyle = (link: string[]): string => {
    if (link.includes(page)) return style.activeLink
    else return ''
  }

  return (
    <>
      {isLoged
        ? <aside className={style.barContainer}>
          <ul>
            <IconLink
              icon={<SvgHouse />}
              name='Inicio'
              href='/home'
              className={
                getActiveLinkStyle(['/home'])
              }/>
            <IconLink
              icon={<SvgClient />}
              name='Clientes'
              href='/home/clients'
              className={
                getActiveLinkStyle(['/home/clients', '/home/client/[clientID]', '/home/client/new'])
              }/>
            <IconLink
              icon={<SvgProducts />}
              name='Productos'
              href='/home/products'
              className={
                getActiveLinkStyle(['/home/products', '/home/product/[productID]', '/home/product/new'])
              }/>
            <IconLink
              icon={<SvgProvider />}
              name='Proveedores'
              href='/home/providers'
              className={
                getActiveLinkStyle(['/home/providers', '/home/provider/[providerID]', '/home/provider/new'])
              }/>
            <IconLink
              icon={<SvgCash />}
              name='Ventas'
              href='/home/sales'
              className={
                getActiveLinkStyle(['/home/sales', '/home/sale/[saleID]', '/home/sale/new'])
              }/>
            <IconLink
              icon={<SvgPurchase />}
              name='Compras'
              href='/home/purchases'
              className={
                getActiveLinkStyle(['/home/purchases', '/home/purchase/[purchaseID]', '/home/purchase/new'])
              }/>
            <IconLink
              icon={<SvgUsers />}
              name='Usuarios'
              href='/home/users'
              className={
                getActiveLinkStyle(['/home/users'])
              }/>
            <IconLink
              icon={<SvgSettings />}
              name='Ajustes'
              href='/home/settings'
              className={
                getActiveLinkStyle(['/home/settings'])
              }/>
          </ul>
        </aside>
        : null
      }
      {children}
    </>
  )
}

export default ControlBar
