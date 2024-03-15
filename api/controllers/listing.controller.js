import Listing from '../models/listing.model.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    console.error("Errore durante la creazione dell'annuncio:", error);
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Annuncio non trovato!'));
  }

  if (req.user.id !== listing.riferimentoUtente) {
    return next(errorHandler(401, 'Puoi cancellare solo il tuo annuncio!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('L annuncio è stato cancellato con successo!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Annuncio non trovato!'));
  }
  if (req.user.id !== listing.riferimentoUtente) {
    return next(errorHandler(401, 'Puoi modificare solo il tuo annuncio!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Annuncio non trovato!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
  
  }


