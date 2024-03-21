export default function Search() {
    return (
      <div className='flex flex-col md:flex-row'>
        <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
          <form className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>Ricerca Annuncio:</label>
              <input
                type='text'
                id='searchTerm'
                placeholder='Cerca...'
                className='border rounded-lg p-3 w-full'
              />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Tipo:</label>
              <div className='flex gap-2'>
                <input type='checkbox' id='all' className='w-5' />
                <span>Affitto & Vendita</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='rent' className='w-5' />
                <span>Affitto</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='sale' className='w-5' />
                <span>Vendita</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='offer' className='w-5' />
                <span>Offerta</span>
              </div>
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Servizi:</label>
              <div className='flex gap-2'>
                <input type='checkbox' id='parking' className='w-5' />
                <span>Parcheggio</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='furnished' className='w-5' />
                <span>Arredata</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sort:</label>
              <select id='sort_order' className='border rounded-lg p-3'>
                <option>Prezzo dall alto verso basso</option>
                <option>Prezzo dal basso verso l alto</option>
                <option>Più recente</option>
                <option>Più vecchio</option>
              </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
              Cerca
            </button>
          </form>
        </div>
        <div className=''>
          <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Risultato Annunci:</h1>
        </div>
      </div>
    );
  }