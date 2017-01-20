var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nguyendan:admin@ds117909.mlab.com:17909/meantodos_learn_dev',['todos']);

// Get todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

// Get single todos
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo){
        if(err){
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

// Save todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var upObj = {};

    if(todo.isCompleted){
        upObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        upObj.text = todo.text;
    }

    if(!upObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(res.params.id)
        }, upObj, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
        _id: mongojs.ObjectId(res.params.id)
    }, '', {}, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;