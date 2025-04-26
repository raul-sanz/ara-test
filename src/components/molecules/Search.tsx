"use client"
import React, { useEffect, useRef, useState } from 'react'
import Input from '../atoms/Input'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ArrowTurnDownLeftIcon } from '@heroicons/react/20/solid';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import useSearchStore from '@/store/useSearchStore';
import clsx from 'clsx';
import { motion } from 'motion/react';
import Skeleton from '../atoms/Skeleton';
import Product from './Product';
import { ProductType } from '@/types/atoms';
import Text from '@/components/atoms/Text';

const Search = ({ noBorder }: { noBorder?: boolean }) => {
  const search = useSearchStore((state) => state.search);
  const setSearch = useSearchStore((state) => state.setSearch);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<[ProductType] | null>(null);
  const [error, setError] = useState<string|null>(null);
  const [isGetting, setIsGetting] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getSearchResults = async (searchText: string) => {
    setResult(null);
    setDescription('');
    inputRef.current?.blur();
    setIsGetting(true);
    setLoading(true);
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: searchText }),
    });

    const { data } = await res.json();

    if (!data) {
      setError('Error inesperado, intenta nuevamente');
      setLoading(false);
      return;
    }

    setResult(data.sugerencias);
    setDescription(data.mensaje);
    setSearch('')
    setLoading(false);
  }

  const closedialog = () => {
    setIsGetting(false)
    setDescription('');
    setResult(null);
    setError(null);
  }

  const validateAndStartSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (search.length > 1) {
        getSearchResults(search);
        setInputError('');
      } else{
        setInputError('Ingresa tu consulta');
      }
    }
  }

  const dots = '.'.repeat(dotCount)

  return (
    <>
      <motion.div
        initial={{ translateY: -40, opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={clsx('w-full lg:w-2xl bg-white rounded-lg', noBorder ? '' : 'p-2')}>

          <Input
            ref={inputRef}
            icon={<MagnifyingGlassIcon className="size-5 text-gray-500" />}
            placeholder="Usa nuestra IA para buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="secondary"
            fullWidth
            size='sm'
            error={!!inputError}
            errorMessage={inputError}
            onKeyDown={validateAndStartSearch}
            rightIcon={<ArrowTurnDownLeftIcon className="size-5 text-gray-500" />}
          />


        </div>
      </motion.div>
      <Dialog onClose={() => { }} as="div" className="relative z-10 focus:outline-none" open={isGetting}>
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="relative max-w-lg w-full border bg-white p-6 max-h-[80vh] overflow-y-auto rounded-lg">

            {!loading && <button
              onClick={closedialog}
              className=" top-3 absolute right-3 z-10 text-gray-500 hover:text-black bg-white rounded-full p-1 shadow"
              aria-label="Cerrar"
            >
              <XMarkIcon className="size-5" />
            </button>}
            <DialogTitle className="font-bold">
              {loading ?
                <p className="text-2xl font-medium">
                  Buscando{dots}
                </p> :
                <p>Encontré {result?.length || 0} Resultados</p>
              }
            </DialogTitle>
            <Description className='text-gray-600 text-xs'>{loading ? 'Estamos buscando los mejores resultados para ti.' : description}</Description>
            <Text color='error'>{error}</Text>
            <div className='grid grid-cols-2 gap-4'>
              {loading && Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
              {result && result?.length > 0 && result?.map((item, index) => (
                <div key={index}>
                  <Product product={item as ProductType} simple />
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Search