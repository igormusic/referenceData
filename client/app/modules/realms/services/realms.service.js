(function () {
  'use strict';
  angular
    .module('com.module.realms')
    .service('RealmsService', function ($state, CoreService, Realm, gettextCatalog) {

      this.getRealms = function () {
        return Realm.find().$promise;
      };

      this.getRealm = function (id) {
        return Realm.findById({
          id: id
        }).$promise;
      };

      this.upsertRealm = function (realm) {
        return Realm.upsert(realm).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Realm saved'),
              gettextCatalog.getString('Your realm is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving realm '),
              gettextCatalog.getString('This realm could no be saved: ') + err
            );
          }
        );
      };

      this.deleteRealm = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Realm.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Realm deleted'),
                gettextCatalog.getString('Your realm is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting realm'),
                gettextCatalog.getString('Your realm is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'id',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Id'),
              required: true
            }
          },
          {
            key: 'description',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Description'),
              required: true
            }
          }
        ];
      };

    });

})();
