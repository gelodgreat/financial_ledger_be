var DataModels = {
    User: require('./User'),
};

for (var model in DataModels) {
    DataModels[model]
}

module.exports = DataModels;