const express = require('express');
const router = express.Router();

var threads = [

]

router.post('/', function(req, res){
    var isAdmin = false;
    if(req.app.get('admins').includes(req.body.userId)) isAdmin = true;

    res.json({threads: threads, isAdmin: isAdmin});
});

router.post('/post', function(req, res){
    var thread = req.body;
    thread.user = {};

    if(thread.name == '') thread.user.name = 'Anonymous';
        else thread.user.name = thread.name
    thread.user.id = thread.userId;
    thread.user.color = thread.userColor;

    thread.id = threads.length;
    thread.comments = [];
    thread.date = Date.now();
    thread.lastUpdate = Date.now();
    
    threads.push(thread);
    res.json(thread);
});

router.get('/:id', function(req, res){
    res.json({thread: threads[req.params.id]})
});

router.put('/:id', function(req, res){
    var reply = req.body;
    reply.user = {};

    if(reply.name == '') reply.user.name = 'Anonymous';
        else reply.user.name = reply.name
    reply.user.id = reply.userId;
    reply.user.color = reply.userColor;

    reply.html = reply.text.trim();
    reply.html = reply.html.replace(/\[quote\]/g, '<div class="reply-quote">');
    reply.html = reply.html.replace(/\[\/quote\]/g, '</div>');
    reply.html = reply.html.replace(/\[from\]/g, '<div class="reply-quote-from">');
    reply.html = reply.html.replace(/\[\/from\]/g, '</div>');

    reply.id = threads[req.params.id].comments.length+2;
    reply.date = Date.now();

    threads[req.params.id].lastUpdate = Date.now();
    threads[req.params.id].comments.push(reply);
});

router.delete('/:id', function(req,res){
    threads.splice(req.params.id, 1);
    res.send('deleted');
});

module.exports = router;
