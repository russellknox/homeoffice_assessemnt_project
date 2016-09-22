const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const fakeDatabase = require('../fakeDatabase');

chai.use(chaiHttp);

  describe('data from fake database', () => {

  const url = "http://localhost:3000";

   it("returns status 200", function(done) {
     chai.request(url)
       .get('/applicants')
       .end((err, res) => {
           res.should.have.status(200);
         done();
       });
     });

  //check the fake applicant shortListed status is opposite
  const fakeApplicant = fakeDatabase.applicants[0]

  it("returns opposite boolean shortlisted status after api request", function(done) {
    chai.request(url)
      .post('/applicants/shortList/' + fakeApplicant.id)
      .send({'applicantId': fakeApplicant.id})
      .end((err, res) => {
          res.should.have.status(200);
          res.should.have.shortlisted;
          res.body.shortListed.should.equal(!fakeApplicant.shortListed);
        done();
      });
    });

})
