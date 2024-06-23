const ESIM = require("../models/ESim");
const Catalog = require("../models/Catalog");


exports.create = async (req, res) => {

    const isExitIMSI = await ESIM.findOne({imsi: req.body?.imsi});
    const isExitIccid = await ESIM.findOne({iccid: req.body?.iccid});

    if (isExitIMSI){
        return res.status(400).json({'error': "IMSI Already Exits"})
    }
    if (isExitIccid){
        return res.status(400).json({'error': "ICCID Already Exits"})
    }

    req.body.vendorId = req.auth?._id;

    try {
        // Create a new eSIM record
        const newESIM = new ESIM(req.body);

        await newESIM.save()

        res.status(201).json({message: 'eSIM saved successfully'})

    }catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'fail',
            error: 'Server error occurred'
        })
    }
}

exports.getVendorESims = async (req, res) => {

    const eSims = await ESIM.find({vendorId: req.auth?._id});

    return res.status(200).json(eSims)
}

exports.getAllVendorESims = async (req, res) => {

    const eSims = await ESIM.find().populate({
        path: 'vendorId',
        select: '-password' // Exclude the password field
    });

    return res.status(200).json(eSims)
}


// eSim Catalog

exports.catalogCreate = async (req, res) => {

    req.body.vendorId = req.auth?._id;

    try {
        // Create a new eSIM record
        const catalog = new Catalog(req.body);

        await catalog.save()

        res.status(201).json({message: 'Catalog create successfully'})

    }catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'fail',
            error: 'Server error occurred'
        })
    }
}

exports.catalogs = async (req, res) => {

    try {
        // Create a new eSIM record
        const catalogs = await Catalog.find({vendorId:  req.auth?._id });

        res.status(201).json(catalogs)

    }catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'fail',
            error: 'Server error occurred'
        })
    }
}

exports.publicCatalogs = async (req, res) => {

    try {
        // Create a new eSIM record
        const catalogs = await Catalog.find().populate({
            select: '-password',
            path: 'vendorId'
        });

        res.status(201).json(catalogs)

    }catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'fail',
            error: 'Server error occurred'
        })
    }
}