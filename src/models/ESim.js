const {Schema, model} = require('mongoose');

const eSIMSchema = new Schema({

    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    imsi: {
        type: String,
        unique: true,
    },
    ki: {
        type: String,
    },
    operatorSpecificData: {
        type: Map,
        of: String,
    },
    cryptographicInformation: {
        type: Map,
        of: String
    },
    subscriptionInformation: {
        dataAllowances: {
            type: Number,
        },
        voiceMinuteQuotas: {
            type: Number,
        },
    },
    iccid: {
        type: String,
        unique: true,
    },
    networksAndRoamingPreferences: {
        preferredNetworks: [{
            type: String
        }],
        roamingSettings: {
            type: Map,
            of: String
        },
    },
}, { timestamps: true, versionKey: false });

const ESIM = model('ESIM', eSIMSchema);

module.exports = ESIM;
