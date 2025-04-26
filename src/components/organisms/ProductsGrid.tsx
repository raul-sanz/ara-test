import React from 'react'
import data from '@/dummy/db.json';
import Product from '../molecules/Product';
import { ProductType } from '@/types/atoms';
import Text from '../atoms/Text';

const ProductsGrid = () => {
  const products: ProductType[] = data as ProductType[]
  return (
    <>
    <Text type='title' align='center' color='primary'>Nuestros productos</Text>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        }
      </div>
    </>
  )
}

export default ProductsGrid