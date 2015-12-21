var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
    winner: String,
    winnerGoals: {type: Number, default: 0},
    loser: String,
    loserGoals: {type: Number, default: 0},
    overtime: {type: Boolean, default: false}
});

mongoose.model('Record', RecordSchema);