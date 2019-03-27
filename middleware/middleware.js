// CUSTOM GLOBAL MIDDLEWARE 

function bouncer(req, res, next) {
    res.status(404).json({message: 'These are not the hubs you are looking for.'})
  }
  
  // server.use(bouncer);
  
  function cohortNamer(req, res, next) {
    req.cohort = 'Web17'
    next()
  }
 
  
  
  function moodyGateKeeper(req, res, next) {
    const seconds = new Date().getSeconds()
    if (seconds % 3 !== 0) {
    res.status(500).json({ message: "YOU SHALL NOT PASS!"})
    } else next() 
    
  } 
  

  
  // CUSTOM LOCAL MIDDLEWARE 
  
  function restricted(req, res, next) {
    const password = req.headers.password 
  
    if (password === 'fastwerd') {
      next() 
    } else {
      res.status(401).json({message: 'invalid credentials'})
    }
  }
  
  
  request = {
    headers: {}
  }
  
  function only(name) {
    return function(req, res, next) {
      const personname = req.headers.name || "" // the "" is to give the right error if they don't put something in
      if (personname.toLowerCase() !== name) {
         res.status(403).json({message: 'you do not have access to this' })
      } else {
        next()
      }
    }
  }
  

  module.exports = { bouncer, restricted, moodyGateKeeper, only, cohortNamer }