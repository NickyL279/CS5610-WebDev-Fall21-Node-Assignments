let profile = require('../data/profile.json');

module.exports = (app) => {
    const getCurrentProfile = (req, res) => res.json(profile);
    app.get('/api/profile', getCurrentProfile);

    const updateCurrentProfile = (req, res) => {
        //console.log("JSON req.body- " + JSON.stringify(req.body));
        //console.log("JSON req.body.name - " + req.body.nameNew);
        profile = {
            ...profile,
            name: req.body.nameNew,
            bio: req.body.bioNew,
            location: req.body.locationNew,
            website: req.body.websiteNew,
            dateOfBirth: req.body.dobNew
        }
        //console.log("New profile- " + JSON.stringify(profile));
        res.json(profile);
    }
    app.put('/api/profile', updateCurrentProfile);
};