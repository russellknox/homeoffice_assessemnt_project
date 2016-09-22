const fakeDatabase = require('../fakeDatabase');

const getSingleApplicant = (req, res) => {

 const params = req.params.applicant
 const applicant = fakeDatabase.applicants.filter(a => a.id === params)
 res.render('applicant',
    {applicant: applicant[0]})
}

module.exports = getSingleApplicant
