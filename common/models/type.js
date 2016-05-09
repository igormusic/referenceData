module.exports = function(Type) {
    Type.beforeCreate = function (next, model) {
        model.id = model.realmId + ":" + model.typeName
        next();
    };
};
