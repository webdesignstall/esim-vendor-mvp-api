const express = require('express');
const router = express.Router();

const {AuthVerifyMiddleware, isSuperAdmin} = require("../middleware/AuthVerifyMiddleware");
const {create, getVendorESims, getAllVendorESims, catalogs, catalogCreate, publicCatalogs, singleCatalog} = require("../controllers/eSimController");


router.post('/esim', AuthVerifyMiddleware, create );
router.get('/esim', AuthVerifyMiddleware, getVendorESims );
router.get('/vendor-esim', AuthVerifyMiddleware, isSuperAdmin, getAllVendorESims );

// catalogs route
router.post('/esim-catalogs', AuthVerifyMiddleware, catalogCreate );
router.get('/esim-catalogs', AuthVerifyMiddleware, catalogs );
router.get('/catalogs', publicCatalogs );
router.get('/catalog/:id', singleCatalog );

module.exports = router;