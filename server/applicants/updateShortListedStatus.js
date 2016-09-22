const fakeDatabase = require('../fakeDatabase');

const updateShortListedStatus = (req, res) => {
  const applicant = fakeDatabase.applicants

  const singleApp = applicant
    .filter(applicant => applicant.id === req.body.applicantId)

  singleApp[0].shortListed = !singleApp[0].shortListed

  res.send(singleApp[0])
}

module.exports = updateShortListedStatus
