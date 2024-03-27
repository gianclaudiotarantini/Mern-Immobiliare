import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    tipo: 'all',
    parcheggio: false,
    arredata: false,
    offerta: false,
    ordine: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('tipo');
    const parkingFromUrl = urlParams.get('parcheggio');
    const furnishedFromUrl = urlParams.get('arredata');
    const offerFromUrl = urlParams.get('offerta');
    const sortFromUrl = urlParams.get('ordine');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        tipo: typeFromUrl || 'all',
        parcheggio: parkingFromUrl === 'true' ? true : false,
        arredata: furnishedFromUrl === 'true' ? true : false,
        offerta: offerFromUrl === 'true' ? true : false,
        ordine: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const urlParams = new URLSearchParams(location.search);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'affitto' ||
      e.target.id === 'vendita'
    ) {
      setSidebardata({ ...sidebardata, tipo: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parcheggio' ||
      e.target.id === 'arredata' ||
      e.target.id === 'offerta' 
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('tipo', sidebardata.tipo);
    urlParams.set('parcheggio', sidebardata.parcheggio);
    urlParams.set('arredata', sidebardata.arredata);
    urlParams.set('offerta', sidebardata.offerta);
    urlParams.set('ordine', sidebardata.ordine);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
    return (
      <div className='flex flex-col md:flex-row'>
        <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>Ricerca Annuncio:</label>
              <input
                type='text'
                id='searchTerm'
                placeholder='Cerca...'
                className='border rounded-lg p-3 w-full'
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Tipo:</label>
              <div className='flex gap-2'>
                <input  onChange={handleChange}
                checked={sidebardata.tipo === 'all'} type='checkbox' id='all' className='w-5' />
                <span>Affitto & Vendita</span>
              </div>
              <div className='flex gap-2'>
                <input  onChange={handleChange}
                checked={sidebardata.tipo === 'affitto'} type='checkbox' id='affitto' className='w-5' />
                <span>Affitto</span>
              </div>
              <div className='flex gap-2'>
                <input  onChange={handleChange}
                checked={sidebardata.tipo === 'vendita'} type='checkbox' id='vendita' className='w-5' />
                <span>Vendita</span>
              </div>
              <div className='flex gap-2'>
                <input  onChange={handleChange}
                checked={sidebardata.offerta} type='checkbox' id='offerta' className='w-5' />
                <span>Offerta</span>
              </div>
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Servizi:</label>
              <div className='flex gap-2'>
                <input  onChange={handleChange}
                checked={sidebardata.parcheggio} type='checkbox' id='parcheggio' className='w-5' />
                <span>Parcheggio</span>
              </div>
              <div className='flex gap-2'>
                <input  onChange={handleChange}
                checked={sidebardata.arredata} type='checkbox' id='arredata' className='w-5' />
                <span>Arredata</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Ordine:</label>
              <select   onChange={handleChange}
              defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
                <option value='regularPrice_desc'>Prezzo dall alto verso basso</option>
                <option value='regularPrice_asc'>Prezzo dal basso verso l alto</option>
                <option value='createdAt_desc'>Più recente</option>
                <option value='createdAt_asc'>Più vecchio</option>
              </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
              Cerca
            </button>
          </form>
        </div>
        <div className='flex-1'>
          <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Risultato Annunci:</h1>
        </div>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>Non ci sono Annunci!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Caricamento...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
             {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Mostra di più
            </button>
          )}
        </div>
      </div>
    );
  }