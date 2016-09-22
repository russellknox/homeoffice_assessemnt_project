const fakeDatabase = require('../fakeDatabase')
const updateShortListedStatus = require('./updateShortListedStatus')
const getSingleApplicant = require('./getSingleApplicant')
const getApplicants = require('./getApplicants')
const getHomePage = require('./getHomePage')


const getAllApplicants = (req, res) => res.render('applicants')

module.exports = {
  getAllApplicants,
  getApplicants,
  getHomePage,
  getSingleApplicant,
  updateShortListedStatus
}
