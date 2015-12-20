var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    name: String,
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    overtimeLosses: {type: Number, default: 0},
    deleted: Boolean
});

//add an upvote() method to the Posts schema
PostSchema.methods.upvote = function (cb) {
    this.wins += 1;
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