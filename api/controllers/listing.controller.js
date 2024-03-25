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

  export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offerta;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.arredata;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
      let parking = req.query.parcheggio;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.tipo;

    if (type === undefined || type === 'all') {
      type = { $in: ['vendita', 'affitto'] };
    }

    const searchTerm = req.query.search || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      nome: { $regex: searchTerm, $options: 'i' },
      offerta: offer,
      arredata: furnished,
      parcheggio: parking,
      tipo: type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};



  




