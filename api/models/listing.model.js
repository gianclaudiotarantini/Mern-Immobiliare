import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    descrizione: {
      type: String,
      required: true,
    },
    indirizzo: {
      type: String,
      required: true,
    },
    prezzoRegolare: {
      type: Number,
      required: true,
    },
    prezzoScontato: {
      type: Number,
      required: true,
    },
    bagni: {
      type: Number,
      required: true,
    },
    camereDaLetto: {
      type: Number,
      required: true,
    },
    arredata: {
      type: Boolean,
      required: true,
    },
    parcheggio: {
      type: Boolean,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    offerta: {
      type: Boolean,
      required: true,
    },
    immagineUrl: {
      type: Array,
      required: true,
    },
    riferimentoUtente: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;