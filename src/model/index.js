var DataModels = {
    User: require('./User'),
    Income: require('./Income'),
};

for (var model in DataModels) {
    DataModels[model]
}

module.exports = DataModels;