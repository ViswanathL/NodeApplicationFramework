var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);
var request = chai.request(server);
var suid = require('rand-token').suid;

describe('Users', function() {
 	it('should list ALL users on /users GET',function(done) {
  		request.get('/users/')
  		.end(function(err, res) {
  			console.log(err);
  			res.should.have.status(200);
  			done();
  		});
	});
  it('should list a SINGLE user on /users/<id> GET');
  it('should return evalidation error a SINGLE user on /users POST', function(done) {
  		request.post('/users/')
  		.send({
				"user_id" : "Aanrosn",
				"email_id" : "antoansy@gmail.com",
 				"first_name" : "ultron",
 				"last_name" : "rinzler",
   				"date": "123456789",
    			"address":  "asdasdasdasdsdasdasd" 
		}).end(function(err, res) {
  			console.log(err);
  			res.should.have.status(200);
  			done();
  		});
	});
  it('should add a SINGLE user on /users POST', function(done) {
  		request.post('/users/')
  		.send({
				"user_id" : suid(4),
				"email_id" : "ant"+suid(4)+"@gmail.com",
 				"first_name" : "ultron",
 				"last_name" : "rinzler",
   				"date": "123456789",
    			"address":  "asdasdasdasdsdasdasd" 
		}).end(function(err, res) {
  			console.log(err);
  			res.should.have.status(200);
  			done();
  		});
	});
  it('should update a SINGLE user on /users/<id> PUT');
  it('should delete a SINGLE users on /users/<id> DELETE');
});