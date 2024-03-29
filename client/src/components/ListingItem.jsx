/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.immagineUrl.length >= 1 ? listing.immagineUrl[0] :
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.nome}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.indirizzo}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.descrizione}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offerta
              ? listing.prezzoScontato.toLocaleString('en-US')
              : listing.prezzoRegolare.toLocaleString('en-US')}
            {listing.tipo === 'affitto' && ' / mese'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.camereDaLetto > 1
                ? `${listing.camereDaLetto} letti `
                : `${listing.camereDaLetto} letto `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bagni > 1
                ? `${listing.bagni} bagni `
                : `${listing.bagni} bagno `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}