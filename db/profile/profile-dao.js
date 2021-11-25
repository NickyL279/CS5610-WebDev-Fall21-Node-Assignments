const model = require('./profile-model');

const getProfile = () => model.findOne();
const updateProfile = (id, profile) => {
    return model.updateOne({_id: id}, {$set: profile})
}

module.exports = {
    getProfile, updateProfile
};