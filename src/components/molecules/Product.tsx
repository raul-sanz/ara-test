"use client"
import React from 'react'
import { ProductType } from '@/types/atoms';
import Image from 'next/image';
import Text from '../atoms/Text';
import { StarIcon } from '@heroicons/react/24/solid';
import Button from '../atoms/Button';
import { motion } from 'motion/react';

const Product = ({ product, simple }: { product: ProductType, simple?: boolean }) => {
  return (
    <div className=' w-full flex justify-center'>

      <div className='flex-grow  shadow-md p-4 rounded-lg w-3/5 flex h-full flex-col gap-2'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='aspect-[16/9] relative'
        >
          <Image src={product.imagen} className='rounded-lg' alt={product.nombre} fill  sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"/>
        </motion.div>
        <Text type={!simple ? "caption" : "paragraph"}  >{product.nombre}</Text>
        <div className='flex justify-between'>
          <Text type="span" >${product.precio}</Text>
          <div className='flex items-center gap-1'><StarIcon className='size-3 text-amber-400' /> <Text type="span">{product.estrellas}</Text> </div>
        </div>
        {!simple && <Text type="span" color='soft'>{product.descripcion}</Text>}
        <Button>{!simple ?'Agregar al carrito':'Comprar'}</Button>
      </div>

    </div>
  )
}

export default Product