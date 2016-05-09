module.exports = function(Value) {
    Value.beforeCreate = function (next, model) {
        model.id = model.typeId + ":" + model.code
        next();
    };
};
