module.exports = function(Local) {
    Local.beforeCreate = function (next, model) {
        model.id = model.valueId + ":" + model.languageCode
        next();
    };
};
