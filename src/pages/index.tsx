import OrganizationList from '#components/OrganizationList/OrganizationList'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import Image from 'next/image'
import styles from '#styles/pages/index.module.css'
import LandingCard from '#components/LandingCard/LandigCard'
import PricesCard from '#components/PricesCard/PricesCard'
import { SvgEMail } from '#assets/SvgEMail'
import MyButton from '#components/Buttons/MyButton'
import { SvgFaceBook } from '#assets/SvgFaceBook'
import { SvgWhatsapp } from '#assets/SvgWhatsapp'
import { SvgTelegram } from '#assets/SvgTelegram'
import { SvgLinkedIn } from '#assets/SvgLinkedin'

const clientImage = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684170043/Landing%20Page/Landing-Client_iq8lae.png'

const productImage = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684170043/Landing%20Page/Landing-Product_wfvkmn.png'

const saleImage = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684170043/Landing%20Page/Landing-Sale_gpiico.png'

const userImage = 'https://res.cloudinary.com/jl-img-store/image/upload/v1683930555/Landing%20Page/LandingClients_ahju1o.png'

export default function LandingPage (): JSX.Element {
  return (
    <>
      <PageTemplate title='Next' navBar>
        <div className={styles.landingContainer}>
          <main className={styles.main}>
            <section className={`${styles.separator} ${styles.hero}`}>
              <h1>CORE~ERP</h1>
              <hr />
              <div className={styles.heroContainer}>
                <Image
                  src={'https://res.cloudinary.com/jl-img-store/image/upload/v1683930626/Landing%20Page/LandingBanner_syisqn.png'}
                  alt='Landing page banner'
                  width={300}
                  height={250}
                  priority
                />
                <p>Entendemos la importancia de tener una aplicación de gestión de clientes y productos eficiente para las empresas que ofertan sus productos o servicios.</p>
              </div>
            </section>

            <section className={styles.cards}>
              <LandingCard title='Clientes' image={clientImage}>
                <p>
                  Con nuestro módulo de clientes, podrás gestionar de manera eficaz la información de tus clientes, lo que te permitirá ofrecer un mejor servicio y aumentar la satisfacción del cliente.
                </p>
              </LandingCard>

              <LandingCard title='Productos' image={productImage}>
                <p>
                  Además, con el módulo de productos, podrás llevar un control sobre tu inventario y optimizar tus procesos de venta.
                </p>
              </LandingCard>

              <LandingCard title='Ventas' image={saleImage}>
                <p>
                  Con el módulo de ventas, podrás administrar tus pedidos y realizar un seguimiento de tus ventas, lo que te ayudará a tomar decisiones informadas para mejorar tu negocio.
                </p>
              </LandingCard>

              <LandingCard title='Usuarios' image={userImage}>
                <p>
                  Por último, nuestro módulo de usuarios te permitirá gestionar el acceso y permisos de tus empleados para asegurar la privacidad de tu información.
                </p>
              </LandingCard>
            </section>

            <section className={`${styles.prices} ${styles.separator}`}>
              <PricesCard title='Pequeña Empresa' price='300'>
                <ul>
                  <li>Hasta 5 Usuarios</li>
                  <li>Hasta 1 negocio registrado</li>
                  <li>Nuevas funcionalidades sin costo adicional</li>
                  <li>Servicio de Soporte Normal</li>
                </ul>
              </PricesCard>

              <PricesCard title='Mediana Empresa' price='600'>
                <ul>
                  <li>Hasta 15 Usuarios</li>
                  <li>Hasta 2 negocio registrado</li>
                  <li>Nuevas funcionalidades sin costo adicional</li>
                  <li>Servicio de Soporte Dedicado</li>
                </ul>
              </PricesCard>

              <PricesCard title='Gran Empresa' price='1200'>
                <ul>
                  <li>Hasta 25 Usuarios</li>
                  <li>Hasta 3 negocio registrado</li>
                  <li>Nuevas funcionalidades sin costo adicional</li>
                  <li>Servicio de Soporte Personalizado 24/7</li>
                </ul>
              </PricesCard>
            </section>

            <section className={styles.contact}>
              <div>
                <h2>Contáctanos</h2>
                <hr />
              </div>
              <p>Como Desarrolladores de Core-Erp, estamos preparados para ayudarte con soluciones tecnológicas para mejorar y automatizar los procesos de tu negocio. Si estás interesado en trabajar con nosotros Contáctanos !!</p>
              <MyButton type='primary' href="mailto:jl.yg91@gmail.com" rel='noopener noreferrer' target='_blank'>Contacto</MyButton>
            </section>

            <section className={styles.socialIcons}>
              <div>
                <a href="https://www.facebook.com/Pepe.Lucho.yepez" rel='noopener noreferrer' target='_blank'>
                  <i title='Facebook'><SvgFaceBook/></i>
                </a>
                <a href="https://walink.co/de4368" rel='noopener noreferrer' target='_blank'>
                  <i title='Whatsapp'><SvgWhatsapp/></i>
                </a>
                <a href="https://t.me/josseyepez" rel='noopener noreferrer' target='_blank'>
                  <i title='Telegram'><SvgTelegram/></i>
                </a>
                <a href="https://www.linkedin.com/in/jose-yepez-garcía" rel='noopener noreferrer' target='_blank'>
                  <i title='LinkedIn'><SvgLinkedIn/></i>
                </a>
                <a href="mailto:jl.yg91@gmail.com" rel='noopener noreferrer' target='_blank'>
                  <i title='Gmail'><SvgEMail/></i>
                </a>
              </div>
            </section>
          </main>
          <aside>
            <OrganizationList />
          </aside>
        </div>
      </PageTemplate>
    </>
  )
}
