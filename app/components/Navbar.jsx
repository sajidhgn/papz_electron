import Image from 'next/image'
import OrderStatusSwitch from './OrderStatusSwitch'

const Navbar = () => {

  return (
    <nav className="navbar flex flex-col justify-between px-5 items-center pb-5 pt-10 sticky top-0 gap-4">

      {/* Logo */}
      <div className="flex flex-col justify-between items-center">
        {/* Logo */}
        <div className="logo-img">
          <Image src="/assets/images/logo.png" alt="LOGO"
            className="w-20"
            height={100}
            width={200}
          />
        </div>
        <div className="title flex">
          <div className="home-icon"></div>
          <p className="text-xl uppercase">Papaz Pizza</p>
        </div>
      </div>

      <OrderStatusSwitch />
    </nav>
  )
}

export default Navbar