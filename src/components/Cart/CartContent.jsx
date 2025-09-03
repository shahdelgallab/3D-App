import React from 'react'
import {RiDeleteBin3Line} from 'react-icons/ri'

const CartContent = () => {
  const cartProducts = [
    {
      id: 1,
      name: "Product",
      size: "M",
      color: "red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1"
    },
    {
      id: 2,
      name: "Product",
      size: "M",
      color: "red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1"
    },
    {
      id: 3,
      name: "Product",
      size: "M",
      color: "red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1"
    },
    {
      id: 4,
      name: "Product",
      size: "M",
      color: "red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1"
    },
  ]
  return (
    <div>
      {
        cartProducts.map((product, index) => (
          <div key={index} className='flex items-start justify-between py-4 border-b'>
            <div className='flex items-start'>
              <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded'/>
              <div>
                <h3>{product.name}</h3>
                <p className='text-sm text-gray-500'>
                  size: {product.size} | color: {product.color}
                </p>
                <div className='flex items-center mt-2'>
                  <button className='border rounded px-2 py-1 text-xl font-medium'>
                    -
                  </button>
                  <span className='mx-4'>{product.quantity}</span>
                  <button className='border rounded px-2 py-1 text-xl font-medium'>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p>${product.price.toLocaleString()}</p>
              <button>
                <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600'/>
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CartContent