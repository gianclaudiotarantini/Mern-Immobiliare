// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Crea un Annuncio
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Nome'
            className='border p-3 rounded-lg'
            id='nome'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Descrizione'
            className='border p-3 rounded-lg'
            id='descrizione'
            required
          />
          <input
            type='text'
            placeholder='Indirizzo'
            className='border p-3 rounded-lg'
            id='indirizzo'
            required
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='Vendere' className='w-5' />
              <span>Vendita</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Affitto' className='w-5' />
              <span>Affitto</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Parcheggio' className='w-5' />
              <span>Parcheggio</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Arredata' className='w-5' />
              <span>Arredata</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Offerta' className='w-5' />
              <span>Offerta</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='Letti'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Letti</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bagni'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Bagni</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='prezzoRegolare'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Prezzo Regolare</p>
                <span className='text-xs'>(€ / mese)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='prezzoScontato'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Prezzo Scontato</p>
                <span className='text-xs'>(€ / mese)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Immagini:
          <span className='font-normal text-gray-600 ml-2'>La prima immagine sarà la cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Crea Annuncio</button>
        </div>
      </form>
    </main>
  );
}