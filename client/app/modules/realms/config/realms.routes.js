(function () {
  'use strict';
  angular
    .module('com.module.realms')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.realms', {
          abstract: true,
          url: '/realms',
          templateUrl: 'modules/realms/views/main.html'
        })
        .state('app.realms.list', {
          url: '',
          templateUrl: 'modules/realms/views/list.html',
          controllerAs: 'ctrl',
          controller: function (realms) {
            this.realms = realms;
          },
          resolve: {
            realms: function (RealmsService) {
              return RealmsService.getRealms();
            }
          }
        })
        .state('app.realms.add', {
          url: '/add',
          templateUrl: 'modules/realms/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, RealmsService, realm) {
            this.realm = realm;
            this.formFields = RealmsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              RealmsService.upsertRealm(this.realm).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            realm: function () {
              return {};
            }
          }
        })
        .state('app.realms.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/realms/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, RealmsService, realm) {
            this.realm = realm;
            this.formFields = RealmsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              RealmsService.upsertRealm(this.realm).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            realm: function ($stateParams, RealmsService) {
              return RealmsService.getRealm($stateParams.id);
            }
          }
        })
        .state('app.realms.view', {
          url: '/:id',
          templateUrl: 'modules/realms/views/view.html',
          controllerAs: 'ctrl',
          controller: function (realm) {
            this.realm = realm;
          },
          resolve: {
            realm: function ($stateParams, RealmsService) {
              return RealmsService.getRealm($stateParams.id);
            }
          }
        })
        .state('app.realms.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, RealmsService, realm) {
            RealmsService.deleteRealm(realm.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            realm: function ($stateParams, RealmsService) {
              return RealmsService.getRealm($stateParams.id);
            }
          }
        });
    });

})();
