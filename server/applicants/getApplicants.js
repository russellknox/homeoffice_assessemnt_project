const fakeDatabase = require('../fakeDatabase')

const getApplicants = (req, res) => {
  const applicants = fakeDatabase.applicants
  const data = applicants.map(applicant => applicant)
  res.send(data)
}

module.exports = getApplicants
