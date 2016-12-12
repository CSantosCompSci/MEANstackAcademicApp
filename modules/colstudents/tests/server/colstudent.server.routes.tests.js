'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Colstudent = mongoose.model('Colstudent'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, colstudent;

/**
 * Colstudent routes tests
 */
describe('Colstudent CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Colstudent
    user.save(function () {
      colstudent = {
        name: 'Colstudent name'
      };

      done();
    });
  });

  it('should be able to save a Colstudent if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Colstudent
        agent.post('/api/colstudents')
          .send(colstudent)
          .expect(200)
          .end(function (colstudentSaveErr, colstudentSaveRes) {
            // Handle Colstudent save error
            if (colstudentSaveErr) {
              return done(colstudentSaveErr);
            }

            // Get a list of Colstudents
            agent.get('/api/colstudents')
              .end(function (colstudentsGetErr, colstudentsGetRes) {
                // Handle Colstudent save error
                if (colstudentsGetErr) {
                  return done(colstudentsGetErr);
                }

                // Get Colstudents list
                var colstudents = colstudentsGetRes.body;

                // Set assertions
                (colstudents[0].user._id).should.equal(userId);
                (colstudents[0].name).should.match('Colstudent name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Colstudent if not logged in', function (done) {
    agent.post('/api/colstudents')
      .send(colstudent)
      .expect(403)
      .end(function (colstudentSaveErr, colstudentSaveRes) {
        // Call the assertion callback
        done(colstudentSaveErr);
      });
  });

  it('should not be able to save an Colstudent if no name is provided', function (done) {
    // Invalidate name field
    colstudent.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Colstudent
        agent.post('/api/colstudents')
          .send(colstudent)
          .expect(400)
          .end(function (colstudentSaveErr, colstudentSaveRes) {
            // Set message assertion
            (colstudentSaveRes.body.message).should.match('Please fill Colstudent name');

            // Handle Colstudent save error
            done(colstudentSaveErr);
          });
      });
  });

  it('should be able to update an Colstudent if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Colstudent
        agent.post('/api/colstudents')
          .send(colstudent)
          .expect(200)
          .end(function (colstudentSaveErr, colstudentSaveRes) {
            // Handle Colstudent save error
            if (colstudentSaveErr) {
              return done(colstudentSaveErr);
            }

            // Update Colstudent name
            colstudent.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Colstudent
            agent.put('/api/colstudents/' + colstudentSaveRes.body._id)
              .send(colstudent)
              .expect(200)
              .end(function (colstudentUpdateErr, colstudentUpdateRes) {
                // Handle Colstudent update error
                if (colstudentUpdateErr) {
                  return done(colstudentUpdateErr);
                }

                // Set assertions
                (colstudentUpdateRes.body._id).should.equal(colstudentSaveRes.body._id);
                (colstudentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Colstudents if not signed in', function (done) {
    // Create new Colstudent model instance
    var colstudentObj = new Colstudent(colstudent);

    // Save the colstudent
    colstudentObj.save(function () {
      // Request Colstudents
      request(app).get('/api/colstudents')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Colstudent if not signed in', function (done) {
    // Create new Colstudent model instance
    var colstudentObj = new Colstudent(colstudent);

    // Save the Colstudent
    colstudentObj.save(function () {
      request(app).get('/api/colstudents/' + colstudentObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', colstudent.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Colstudent with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/colstudents/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Colstudent is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Colstudent which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Colstudent
    request(app).get('/api/colstudents/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Colstudent with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Colstudent if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Colstudent
        agent.post('/api/colstudents')
          .send(colstudent)
          .expect(200)
          .end(function (colstudentSaveErr, colstudentSaveRes) {
            // Handle Colstudent save error
            if (colstudentSaveErr) {
              return done(colstudentSaveErr);
            }

            // Delete an existing Colstudent
            agent.delete('/api/colstudents/' + colstudentSaveRes.body._id)
              .send(colstudent)
              .expect(200)
              .end(function (colstudentDeleteErr, colstudentDeleteRes) {
                // Handle colstudent error error
                if (colstudentDeleteErr) {
                  return done(colstudentDeleteErr);
                }

                // Set assertions
                (colstudentDeleteRes.body._id).should.equal(colstudentSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Colstudent if not signed in', function (done) {
    // Set Colstudent user
    colstudent.user = user;

    // Create new Colstudent model instance
    var colstudentObj = new Colstudent(colstudent);

    // Save the Colstudent
    colstudentObj.save(function () {
      // Try deleting Colstudent
      request(app).delete('/api/colstudents/' + colstudentObj._id)
        .expect(403)
        .end(function (colstudentDeleteErr, colstudentDeleteRes) {
          // Set message assertion
          (colstudentDeleteRes.body.message).should.match('User is not authorized');

          // Handle Colstudent error error
          done(colstudentDeleteErr);
        });

    });
  });

  it('should be able to get a single Colstudent that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Colstudent
          agent.post('/api/colstudents')
            .send(colstudent)
            .expect(200)
            .end(function (colstudentSaveErr, colstudentSaveRes) {
              // Handle Colstudent save error
              if (colstudentSaveErr) {
                return done(colstudentSaveErr);
              }

              // Set assertions on new Colstudent
              (colstudentSaveRes.body.name).should.equal(colstudent.name);
              should.exist(colstudentSaveRes.body.user);
              should.equal(colstudentSaveRes.body.user._id, orphanId);

              // force the Colstudent to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Colstudent
                    agent.get('/api/colstudents/' + colstudentSaveRes.body._id)
                      .expect(200)
                      .end(function (colstudentInfoErr, colstudentInfoRes) {
                        // Handle Colstudent error
                        if (colstudentInfoErr) {
                          return done(colstudentInfoErr);
                        }

                        // Set assertions
                        (colstudentInfoRes.body._id).should.equal(colstudentSaveRes.body._id);
                        (colstudentInfoRes.body.name).should.equal(colstudent.name);
                        should.equal(colstudentInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Colstudent.remove().exec(done);
    });
  });
});
