const {Schema, model} = require('mongoose');

const eSIMSchema = new Schema({
    imsi: { type: String },
    ki: { type: String },
    operatorSpecificData: {
        apn: { type: String },
        settings: {
            networkSelectionMode: { type: String },
            preferredNetwork: { type: String }
        }
    },
    cryptographicInformation: {
        securityKeys: { type: String, },
        certificates: { type: String, }
    },
    subscriptionInformation: {
        plan: { type: String, },
        dataAllowance: { type: String, },
        voiceMinutes: { type: String, },
        sms: { type: String,  }
    },
    iccid: { type: String, },
    networksAndRoamingPreferences: {
        preferredNetworks: { type: [String], },
        roaming: { type: String, }
    },
    vendorId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true, versionKey: false});

const ESIM = model('ESIM', eSIMSchema);

module.exports = ESIM;
