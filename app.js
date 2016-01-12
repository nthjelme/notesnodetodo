var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var Pool = require("odbc").Pool
var pool = new Pool();
var cn = "DSN=Notes";

app.use(express.static(__dirname + '/public'));

app.get('/api/v1/todos', function(req, res) {
  pool.open(cn, function (err,db) {
    if (err) {
      return console.log(err);
    }
    db.query("select * from todos", function (err, rows, moreResultSets) {
      if (err) {
        return console.log(err);
      }
      res.json(rows);
      db.close(function() {
      });
    });
  });
});

app.post('/api/v1/todos', function(req,res) {
  var data = {todoText: req.body.text, complete: false};
  console.log("data.todoText:"+ data.todoText)
  pool.open(cn, function (err,db) {
    if (err) {
      return console.log(err);
    }

    db.query("INSERT INTO Todo (todoText,todoComplete) VALUES('"+data.todoText+"','"+data.complete+"')", function (err, rows, moreResultSets) {
      if (err) {
        return console.log(err);
      }
      db.query("select * from todos", function (err, rows, moreResultSets) {
        if (err) {
          return console.log(err);
        }
        res.json(rows);
        db.close(function() {
        });
      });
    });
  });
});

app.put('/api/v1/todos/:todo_id', function(req, res) {
    var id = req.params.todo_id;

    var data = {todoText: req.body.todoText, todoComplete: req.body.todoComplete };
    console.log("data",data);
    pool.open(cn, function (err,db) {
      if (err) {
        return console.log(err);
      }

      db.query("UPDATE Todo SET todoText='"+data.todoText+"',todoComplete='"+data.todoComplete+ "' WHERE todoId='"+id+"';", function (err, rows, moreResultSets) {
        if (err) {
          return console.log(err);
        }
        db.query("select * from todos", function (err, rows, moreResultSets) {
          if (err) {
            return console.log(err);
          }
          res.json(rows);
          db.close(function() {
          });
        });
      });
    });
});

app.delete('/api/v1/todos/:todo_id', function(req, res) {
  var id = req.params.todo_id;
  pool.open(cn, function (err,db) {
    if (err) {
      return console.log(err);
    }
    db.query("DELETE FROM Todos WHERE unid = '"+id+"'", function (err, rows, moreResultSets) {
      if (err) {
          return console.log(err);
      }
      db.query("select * from todos", function (err, rows, moreResultSets) {
        if (err) {
          return console.log(err);
        }
        res.json(rows);
        db.close(function() {
        });
      });
    });
  });
});


app.listen(3000, '127.0.0.1', function() {
	// print a message when the server starts listening
  console.log("sever starting on 3000");
});
