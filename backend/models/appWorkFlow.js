const mongoose = require('mongoose');

const schema = mongoose.Schema({
    SeqNo: { type: Integer, required: true },
    AppGroup: { type: String, required: true },
    Method: { type: String, required: true },
    Flow: { type: String, required: true },
    Level: { type: Integer, required: true },
    CreateBy: { type: String},
    CreateDate: { type: Date},
    UpdateBy: { type: String},
    UpdateDate: { type: Date}
});

module.exports = mongoose.model('AppWorkFlow', schema);
