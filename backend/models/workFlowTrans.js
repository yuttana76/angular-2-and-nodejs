const mongoose = require('mongoose');

const schema = mongoose.Schema({
    AppId: { type: Integer, required: true },
    CordeRef: { type: String, required: true },
    Flow: { type: String, required: true },
    Level: { type: String, required: true },
    WFStatus: { type: Integer, required: true },
    ActionBy: { type: String},
    ActionDate: { type: Date}
});

module.exports = mongoose.model('AppWorkFlow', schema);
