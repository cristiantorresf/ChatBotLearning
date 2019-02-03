module.exports = (req, res) => {
  const hubChallenge = req.query['hub.challenge'];
  const hubMode = req.query['hub.mode'];
  console.log(`hub mode = ${hubMode}`);
  console.log(`hubChallenge = ${hubChallenge}`);
  console.log(`verifyTokenMatches = ${req.query['hub.verify_token']}`);
  const verifyTokenMatches = (req.query['hub.verify_token'] === 'mitokenpersonalizado');
  if (hubMode && verifyTokenMatches) {
   res.status(200).send(hubChallenge);
   } else {
   res.status(403).end();
   }
  };