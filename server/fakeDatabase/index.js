
const fakeDatabase = {
  "applicants": [
    {
      "id": "75818140-f818-4d5e-b5c9-b2919eb635a0",
      "name": 'Sam Jackson',
      "email": "sam@yahoo.com",
      "dob": '15/04/1986',
      "shortListed": false,
      "workHistory": [
        {
          "positionheld": 'Teacher',
          "dateFrom": '03/06/2013',
          "dateTo": 'Present',
          "duties": ['Teaching English', 'Head of Sixth Form']
        },
        {
          "positionheld": 'Teaching Assistant',
          "dateFrom": '01/02/2011',
          "dateTo": '01/06/2013',
          "duties": ['Looking after Children', "Helping Chhildren to read"]

        },
        {
          "positionheld": 'Student',
          "dateFrom": '01/10/2008',
          "dateTo": '01/06/2011',
          "duties": ['Studing to become a Teacher']

        }
      ],
    },
    {
        "id": "8ac32fde-2ea1-45cf-b912-476da6462f50",
        "name": 'Edward Murs',
        "email": "eddie@yahoo.com",
        "dob": '12/07/1979',
        "shortListed": false,
        "workHistory": [
          {
            "positionheld": 'Sales Manager',
            "dateFrom": '01/03/2009',
            "dateTo": 'Present',
            "duties": ['Managing over 25 staff',
                       'Increarsed sales revenue by 25%',
                       'Manager of the year 2015'
                     ]
          },
          {
            "positionheld": 'Sales Assistant',
            "dateFrom": '30/01/2006',
            "dateTo": '01/03/2009',
            "duties": ['Selling Products', "Providing exceptional customer service"]

          },
          {
            "positionheld": 'Sales Admin',
            "dateFrom": '01/12/2002',
            "dateTo": '30/01/2006',
            "duties": ['Processing sales orders', 'Chasing customer payments']

          }
        ],
    },
    {
      "id": "75818140-f838-4d5e-b5c9-b2919eb4475a0",
      "name": 'Arther Daley',
      "email": "adaley@yahoo.com",
      "dob": '02/12/1963',
      "shortListed": true,
      "workHistory": [
        {
          "positionheld": 'Cleaning Supervisor',
          "dateFrom": '01/10/2013',
          "dateTo": 'Present',
          "duties": ['Managing all cleaning contracts', "Supervising all cleaning staff"]

        },
        {
          "positionheld": 'Cleaner',
          "dateFrom": '17/06/2009',
          "dateTo": '01/10/2013',
          "duties": ['Cleaning offices to a high standard', "Ordering cleaning supplies"]

        },
        {
          "positionheld": 'Unemployed',
          "dateFrom": '01/10/2000',
          "dateTo": '17/06/2009',
          "duties": ['Looking for work']

        }
      ],
    },
    {
      "id": "75jdhy5140-f838-4d5e-b5c9-b4459eb4475a0",
      "name": 'Susan Dent',
      "email": "sizi@yahoo.com",
      "dob": '06/09/1980',
      "shortListed": false,
      "workHistory": [
        {
          "positionheld": 'Marketing Manager',
          "dateFrom": '06/14/2015',
          "dateTo": 'Present',
          "duties": ["Products Marketing",
                     "Consumer Research",
                     "Client Presenatation"
                   ]

        },
        {
          "positionheld": 'Marketing Asistant',
          "dateFrom": '22/06/2004',
          "dateTo": '06/14/2015',
          "duties": ['Employee Engagement', "Consumer research"]

        },
        {
          "positionheld": 'Student - Manchester University',
          "dateFrom": '01/10/2001',
          "dateTo": '17/06/2004',
          "duties": ['Studing Business Marketing']

        }
      ],
    },
    {
      "id": "885b5bb0-7b46-468f-8d12-082c02c227f9",
      "name": 'Russell Knox',
      "email": "russell@yahoo.com",
      "dob": '06/07/1984',
      "shortListed": true,
      "workHistory": [
        {
          "positionheld": 'Junior Web Developer',
          "dateFrom": '01/02/2005',
          "dateTo": '02/08/2014',
          "duties": ['CSS', 'JavaScript']
        },
        {
          "positionheld": 'Senior Web Developer',
          "dateFrom": '01/02/2005',
          "dateTo": '02/08/2014',
          "duties": ['React', "Redux", "Webpack"]

        }
      ],
    },
  ]
}

module.exports = fakeDatabase
