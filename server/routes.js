const applicants = require('./applicants')

module.exports = (app) => {
  //routes
  app.get('/', applicants.getHomePage)
  app.get('/applicants', applicants.getAllApplicants)
  app.get('/applicants/:applicant', applicants.getSingleApplicant)

  //api
  app.get('/api/applicants', applicants.getApplicants)
  app.post('/applicants/shortList/:applicant', applicants.updateShortListedStatus)
}
