const fakeDatabase = require('../fakeDatabase')

const getHomePage = (req, res) => {

  const numberOfApplicants = fakeDatabase.applicants.length
  const numberOfShortlisted = fakeDatabase.applicants.filter(a => a.shortListed).length

  res.render('home', {
      numberOfApplicants,
      numberOfShortlisted
    }
  )
}

module.exports = getHomePage
