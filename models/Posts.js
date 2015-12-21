var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    name: String,
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    overtimeLosses: {type: Number, default: 0},
    winsAgainstLuke: {type: Number, default: 0},
    lossesToLuke: {type: Number, default: 0},
    overtimeLossesToLuke: {type: Number, default: 0},
    winsAgainstBill: {type: Number, default: 0},
    lossesToBill: {type: Number, default: 0},
    overtimeLossesToBill: {type: Number, default: 0},
    winsAgainstKevin: {type: Number, default: 0},
    lossesToKevin: {type: Number, default: 0},
    overtimeLossesToKevin: {type: Number, default: 0},
    winsAgainstJake: {type: Number, default: 0},
    lossesToJake: {type: Number, default: 0},
    overtimeLossesToJake: {type: Number, default: 0},
    winsAgainstGeoff: {type: Number, default: 0},
    lossesToGeoff: {type: Number, default: 0},
    overtimeLossesToGeoff: {type: Number, default: 0},
    deleted: Boolean
});

//add an upvote() method to the Posts schema
PostSchema.methods.upvote = function (cb) {
    this.wins += 1;
    this.save(cb);
};
PostSchema.methods.addWinAgainstKevin = function (cb) {
    this.winsAgainstKevin += 1;
    this.save(cb);
};
PostSchema.methods.addWinAgainstLuke = function (cb) {
    this.winsAgainstLuke += 1;
    this.save(cb);
};
PostSchema.methods.addWinAgainstBill = function (cb) {
    this.winsAgainstBill += 1;
    this.save(cb);
};
PostSchema.methods.addWinAgainstJake = function (cb) {
    this.winsAgainstJake += 1;
    this.save(cb);
};
PostSchema.methods.addWinAgainstGeoff = function (cb) {
    this.winsAgainstGeoff += 1;
    this.save(cb);
};

PostSchema.methods.addLossToGeoff = function (cb) {
    this.lossesToGeoff += 1;
    this.save(cb);
};
PostSchema.methods.addLossToLuke = function (cb) {
    this.lossesToLuke += 1;
    this.save(cb);
};
PostSchema.methods.addLossToKevin = function (cb) {
    this.lossesToKevin += 1;
    this.save(cb);
};
PostSchema.methods.addLossToBill = function (cb) {
    this.lossesToBill += 1;
    this.save(cb);
};
PostSchema.methods.addLossToJake = function (cb) {
    this.lossesToJake += 1;
    this.save(cb);
};

PostSchema.methods.addOvertimeLossToJake = function (cb) {
    this.overtimeLossesToJake += 1;
    this.save(cb);
};
PostSchema.methods.addOvertimeLossToLuke = function (cb) {
    this.overtimeLossesToLuke += 1;
    this.save(cb);
};
PostSchema.methods.addOvertimeLossToBill = function (cb) {
    this.overtimeLossesToBill += 1;
    this.save(cb);
};
PostSchema.methods.addOvertimeLossToGeoff = function (cb) {
    this.overtimeLossesToGeoff += 1;
    this.save(cb);
};
PostSchema.methods.addOvertimeLossToKevin = function (cb) {
    this.overtimeLossesToKevin += 1;
    this.save(cb);
};


PostSchema.methods.downvote = function (cb) {
    this.deleted = true;
    this.save(cb);
};

PostSchema.methods.addLoss = function (cb) {
    this.losses += 1;
    this.save(cb);
};

PostSchema.methods.addOvertimeLoss = function (cb) {
    this.overtimeLosses += 1;
    this.save(cb);
};
mongoose.model('Post', PostSchema);