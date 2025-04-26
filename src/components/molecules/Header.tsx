"use client";
import React from 'react'
import Button from '../atoms/Button'
import Image from 'next/image'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { clsx } from 'clsx'
import { useScreenSize } from '@/hooks/useDeviceView';
import Search from './Search';
import { motion } from 'motion/react';

const Header = () => {
  const scrollY = useScrollPosition();
  const { isMobile } = useScreenSize();
  return (
    <header
      className={clsx(
        'flex justify-between px-8  bg-main-400 items-center',
        'transition-all duration-700 ease-out header-animation',
        scrollY > 0
          ? 'sticky top-0  rounded-none z-10 h-16 shadow-5xl'
          : 'rounded-lg h-16'
      )}
    >
      <Image src="/images/e_logo.png" alt="Logo" width={32} height={32} />

      <div className={clsx(
        'transition-all duration-300 ease-in-out transform max-w-44 lg:max-w-full',
        {
          'opacity-100 translate-y-0': isMobile ? scrollY > 400 : scrollY > 350,
          'opacity-0 translate-y-8': isMobile ? scrollY <= 400 : scrollY <= 350
        }
      )}
      >
        <Search noBorder />
      </div>

      <motion.div
        animate={scrollY < 320 ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="origin-right"
      >
        <Button color="secondary" className="transition-none">
          Entrar
        </Button>
      </motion.div>

    </header>
  )
}

export default Header