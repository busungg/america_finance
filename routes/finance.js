var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;


/* GET home page. */
router.get('/', function(req, res, next) {
    axios.get('https://stockrow.com/api/companies/AMZN/financials.xlsx?dimension=Q&section=Metrics&sort=desc',
    {
        responseType: 'arraybuffer',
        headers: {
            'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    })
    .then(function (response) {
        fs.writeFileSync(
            path.join(__dirname,
            '../public/data', 
            'output.xlsx'), 
            response.data, 
            'binary', 
            function (err) {
                console.log(err);
            });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    
    res.send('respond with a resource');
});

module.exports = router;
