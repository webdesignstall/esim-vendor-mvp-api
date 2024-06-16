const express = require('express');
const router = express.Router();

const {AuthVerifyMiddleware, isSuperAdmin} = require("../middleware/AuthVerifyMiddleware");
const {create, getVendorESims, getAllVendorESims} = require("../controllers/eSimController");


router.post('/esim', AuthVerifyMiddleware, create );
router.get('/esim', AuthVerifyMiddleware, getVendorESims );
router.get('/vendor-esim', AuthVerifyMiddleware, isSuperAdmin, getAllVendorESims );


module.exports = router;