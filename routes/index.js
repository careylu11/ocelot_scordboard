var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//these models are found in the /models folder
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Record = mongoose.model('Record');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

//req=request object from the client
//res=response object to send back
router.get('/posts', function (req, res, next) {
    //grab all of the posts from the mongoose model which === the mongodb schema
    Post.find(function (err, posts) {
        //if we get an error, throw it to error handler
        //not sure yet how next works, so also sending to console
        if (err) {
            console.log(err);
            return next(err);
        }
        
        //recieved all of the posts, so send them in the response as a json
        res.json(posts);
    });
});
router.get('/records', function (req, res, next) {
    //grab all of the posts from the mongoose model which === the mongodb schema
    Record.find(function (err, records) {
        //if we get an error, throw it to error handler
        //not sure yet how next works, so also sending to console
        if (err) {
            console.log(err);
            return next(err);
        }
        
        //recieved all of the posts, so send them in the response as a json
        res.json(records);
    });
});
router.post('/posts', function (req, res, next) {
    //post is going to be created with the Post mongoose model
    //this creates a new object in memory before saving it
    var post = new Post(req.body);
    
    post.save(function (err, post) {
        if (err) { return next(err); }
        //no error, so respond with the post?
        //guessing .save adds this to the database,
        //and this res throws it back to the client confirming the save?
        res.json(post);
    });
});
router.post('/records', function (req, res, next) {
    //post is going to be created with the Post mongoose model
    //this creates a new object in memory before saving it
    console.log('creating record...');
    var record = new Record(req.body);
    
    record.save(function (err, record) {
        if (err) { return next(err); }
        //no error, so respond with the post?
        //guessing .save adds this to the database,
        //and this res throws it back to the client confirming the save?
        res.json(record);
    });
});
//param auto loads an object rather than reloading it every time
//for this, I need to grab the post ID
//this allows route URLs with :post in them to use this function to
//determine the post to use
//high five
router.param('post', function (req, res, next, id) {
    var query = Post.findById(id);
    query.exec(function (err, post) {
        //first throw an error if found through http
        if (err) { return next(err); }
        //again throw and error if the post does not exist for this id
        if (!post) { return next(new Error("Cannot find post!")); }
        //if no errors, toss post to the request object to use later
        req.post = post;
        //http://stackoverflow.com/questions/8710669/having-a-hard-time-trying-to-understand-next-next-in-express-js
        //next calls the next middleware in the que
        //in this case, it is the route handler
        //at least if used in router.post('/posts:post')
        //here this param is called first, THEN the router finishes after retrieving the post
        return next();
    });
});
router.param('record', function (req, res, next, id) {
    var query = Record.findById(id);
    query.exec(function (err, record) {
        //first throw an error if found through http
        if (err) { return next(err); }
        //again throw and error if the post does not exist for this id
        if (!record) { return next(new Error("Cannot find post!")); }
        //if no errors, toss post to the request object to use later
        req.record = record;
        return next();
    });
});
//for comment upvotes, I also need a comment param
router.param('comment', function (req, res, next, id) {
    var query = Comment.findById(id);
    query.exec(function (err, comment) {
        if (err) {return next(err); }
        if (!comment) { return next(new Error("Cannot find comment!")); }
        req.comment = comment;
        return next();
    });
});

//for handling a single post, as explained above,
//we use the 'post' param to figure out what post we're using
//the param handles errors, so this doesn't need to since it wont complete without it
router.get('/posts/:post', function (req, res) {
    //using the populate() method, all of the comments associated with this post
    //are loaded
    req.post.populate('comments', function (err, post) {
    //the post object will be retrieved and added to the req object by
    //the param middleware, so we just have to send the
    //json back to the client
        res.json(req.post);
    });
});
router.get('/records/:record', function (req, res) {
    req.record.populate('records', function (err, post) {
    //the post object will be retrieved and added to the req object by
    //the param middleware, so we just have to send the
    //json back to the client
        res.json(req.record);
    });
});
//route for post upvotes
router.put('/posts/:post/upvote', function (req, res, next) {
    req.post.upvote(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});

//route for post downvotes
router.put('/posts/:post/downvote', function (req, res, next) {
    console.log('downvote');
    req.post.downvote(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});

//route for post losses
router.put('/posts/:post/addLoss', function (req, res, next) {
    console.log('addLoss');
    req.post.addLoss(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post wins against luke
router.put('/posts/:post/addWinAgainstLuke', function (req, res, next) {
    req.post.addWinAgainstLuke(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post wins against bill
router.put('/posts/:post/addWinAgainstBill', function (req, res, next) {
    req.post.addWinAgainstBill(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post wins against kevin
router.put('/posts/:post/addWinAgainstKevin', function (req, res, next) {
    req.post.addWinAgainstKevin(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post wins against jake
router.put('/posts/:post/addWinAgainstJake', function (req, res, next) {
    req.post.addWinAgainstJake(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post wins against Geoff
router.put('/posts/:post/addWinAgainstGeoff', function (req, res, next) {
    req.post.addWinAgainstGeoff(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post losses to Geoff
router.put('/posts/:post/addLossToGeoff', function (req, res, next) {
    req.post.addLossToGeoff(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post losses to Luke
router.put('/posts/:post/addLossToLuke', function (req, res, next) {
    req.post.addLossToLuke(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post losses to Jake
router.put('/posts/:post/addLossToJake', function (req, res, next) {
    debugger;
    req.post.addLossToJake(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post losses to Bill
router.put('/posts/:post/addLossToBill', function (req, res, next) {
    req.post.addLossToBill(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post losses to Kevin
router.put('/posts/:post/addLossToKevin', function (req, res, next) {
    req.post.addLossToKevin(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post over time losses to Kevin
router.put('/posts/:post/addOvertimeLossToKevin', function (req, res, next) {
    req.post.addOvertimeLossToKevin(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post over time losses to Bill
router.put('/posts/:post/addOvertimeLossToBill', function (req, res, next) {
    req.post.addOvertimeLossToBill(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post over time losses to Luke
router.put('/posts/:post/addOvertimeLossToLuke', function (req, res, next) {
    req.post.addOvertimeLossToLuke(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post over time losses to Kevin
router.put('/posts/:post/addOvertimeLossToJake', function (req, res, next) {
    req.post.addOvertimeLossToJake(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post over time losses to Kevin
router.put('/posts/:post/addOvertimeLossToGeoff', function (req, res, next) {
    req.post.addOvertimeLossToGeoff(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});
//route for post overtime losses
router.put('/posts/:post/addOvertimeLoss', function (req, res, next) {
    console.log('addOvertimeLoss');
    req.post.addOvertimeLoss(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});

//comments routing, per post
router.post('/posts/:post/comments', function (req, res, next) {
    //pass the request body into a new Comment mongoose model
    console.log('potato');
    var comment = new Comment(req.body);
    console.log('pajama');
    //check for errors, and save the comment if none
    comment.save(function (err, comment) {
        if (err) { return next(err); }
        //no http errors, add this comment to the comments array
        req.post.comments.push(comment);
        
        req.post.save(function (err, post) {
            if (err) { return next(err); }
            
            res.json(comment);
        });
    });
});

router.get('/posts/:post/comments', function (req, res) {
    res.json(req.post.comments);
});

//comment upvotes
router.put('/posts/:post/comments/:comment/upvote', function (req, res, next) {
    req.comment.upvote(function (err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

//comment downvotes
router.put('/posts/:post/comments/:comment/downvote', function (req, res, next) {
    req.comment.downvote(function (err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

module.exports = router;
