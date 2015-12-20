var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
    winner: String,
    winnerGoals: {type: Number, default: 0},
    loser: String,
    loserGoals: {type: Number, default: 0},
    overtime: Boolean,
    
});

mongoose.model('Record', RecordSchema);