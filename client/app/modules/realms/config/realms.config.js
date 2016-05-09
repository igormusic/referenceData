(function () {
  'use strict';
  angular
    .module('com.module.realms')
    .run(function ($rootScope, Realm, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Realms'), 'app.realms.list', 'fa-file-o');

      Realm.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Realms'), 'bg-green', 'ion-clipboard', data.length, 'app.realms.list');
      });

    });

})();
