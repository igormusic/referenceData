module.exports = function(Realm) {
    Realm.validatesUniquenessOf('`name', { message: 'realm name is not unique' });
};
