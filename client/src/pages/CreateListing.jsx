/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    immagineUrl: [],
    nome: '',
    descrizione: '',
    indirizzo: '',
    tipo: 'affitto',
    camereDaLetto: 1,
    bagni: 1,
    prezzoRegolare: 50,
    prezzoScontato: 0,
    offerta: false,
    parcheggio: false,
    arredata: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.immagineUrl.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            immagineUrl: formData.immagineUrl.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Caricamento immagine non riuscito (2 mb massimo per immagine)');
          setUploading(false);
        });
    } else {
      setImageUploadError('Puoi inviare fino a 6 immagini per annuncio');
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'vendita' || e.target.id === 'affitto') {
      setFormData({
        ...formData,
        tipo: e.target.id,
      });
    }

    if (
      e.target.id === 'parcheggio' ||
      e.target.id === 'arredata' ||
      e.target.id === 'offerta'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.immagineUrl.length < 1)
        return setError('Devi caricare almeno un immagine');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Il prezzo scontato deve essere inferiore al prezzo regolare');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          riferimentoUtente: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      immagineUrl: formData.immagineUrl.filter((_, i) => i !== index),
    });
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Crea un Annuncio
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Nome'
            className='border p-3 rounded-lg'
            id='nome'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.nome}
          />
          <textarea
            type='text'
            placeholder='Descrizione'
            className='border p-3 rounded-lg'
            id='descrizione'
            required
            onChange={handleChange}
            value={formData.descrizione}
          />
          <input
            type='text'
            placeholder='Indirizzo'
            className='border p-3 rounded-lg'
            id='indirizzo'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='vendita' className='w-5' onChange={handleChange}  checked={formData.tipo === 'vendita'}/>
              <span>Vendita</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='affitto' className='w-5'  onChange={handleChange} checked={formData.tipo === 'affitto'} />
              <span>Affitto</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parcheggio' className='w-5'  onChange={handleChange} checked={formData.parcheggio} />
              <span>Parcheggio</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='arredata' className='w-5'  onChange={handleChange} checked={formData.arredata} />
              <span>Arredata</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offerta' className='w-5' onChange={handleChange} checked={formData.offerta} />
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
                onChange={handleChange}
                value={formData.camereDaLetto}
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
                onChange={handleChange}
                value={formData.bagni}
              />
              <p>Bagni</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='prezzoRegolare'
                min='50'
                max='1000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.prezzoRegolare}
              />
              <div className='flex flex-col items-center'>
                <p>Prezzo Regolare</p>
                {formData.tipo === 'affitto' && (
                <span className='text-xs'>(€ / mese)</span>
                )}               
              </div>
            </div>
            {formData.offerta && (
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='prezzoScontato'
                min='0'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                  value={formData.prezzoScontato}
              />
              <div className='flex flex-col items-center'>
                <p>Prezzo Scontato</p>
                {formData.tipo === 'affitto' && (
                <span className='text-xs'>(€ / mese)</span>
                )}               
              </div>
            </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Immagini:
          <span className='font-normal text-gray-600 ml-2'>La prima immagine sarà la cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='immagineUrl' accept='image/*' multiple />
            <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'> {uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
        
        <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.immagineUrl.length > 0 &&
            formData.immagineUrl.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creazione...' : 'Crea Annuncio'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}