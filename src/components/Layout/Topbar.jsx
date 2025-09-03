import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'

const Topbar = () => {
  return (
    <div className='bg-branding-red text-white'>
      <div className='container mx-auto flex justify-between items-center py-3'>
        <div className='hidden md:flex items-center space-x-4'>
          <a href="#" className='hover:text-gray-300'></a>
          <TbBrandMeta className='h-5 2-5'/>
          <a href="#" className='hover:text-gray-300'></a>
          <IoLogoInstagram className='h-5 2-5'/>
          <a href="#" className='hover:text-gray-300'></a>
          <RiTwitterXLine className='h-4 2-4'/>
        </div>
        <div className='text-sm text-center flex-grow'>
          <span>We Ship Worldwild - Fast and Reliable Shipping!</span>
        </div>
        <div className='text-sm hidden md:block'>
          <a href="tel:+1234567890" className='hover:text-gray-300'>
            +1 (234) 567890
          </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar