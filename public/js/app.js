/**
 * Demo application for ng-breadcrumbs
 * http://ianwalter.github.io/ng-breadcrumbs
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
define(
  [
    'angular',
    'angular-route',
    'angular-route-segment',
    'public/js/controller/home-controller',
    'public/js/controller/stock-history-controller',
    'public/js/controller/stock-controller',
    'public/js/controller/stock-detail-controller',
    'public/js/controller/investor-controller',
    'public/js/controller/investor-position-controller'
  ],
  function(angular) {
    'use strict';

    angular.module('ng-breadcrumbs-demo', [
        'ngRoute',
        'route-segment',
        'view-segment',
        'ng-breadcrumbs-demo.home-controller',
        'ng-breadcrumbs-demo.stock-history-controller',
        'ng-breadcrumbs-demo.stock-controller',
        'ng-breadcrumbs-demo.stock-detail-controller',
        'ng-breadcrumbs-demo.investor-controller',
        'ng-breadcrumbs-demo.investor-position-controller'
      ])
      .config(['$routeSegmentProvider', '$routeProvider', function($routeSegmentProvider, $routeProvider) {
        // @TODO Adopt v0.4.2
        /*$routeSegmentProvider.options.autoLoadTemplates = true;
        $routeSegmentProvider.options.strictMode = true;

        $routeSegmentProvider
          .when('/',                                      'main')
          .when('/stock/:stock',                          'main.stock')
          .when('/stock/:stock/detail',                   'main.stock.detail')
          .when('/stock/:stock/history',                  'main.stock.history')
          .when('/investor/:investor',                    'main.investor')
          .when('/investor/:investor/position/:position', 'main.investor.position')

          .segment('main', {
            controller: 'HomeController',
            templateUrl: 'public/template/home.html',
            label: 'Home'
          })
          .within()
            .segment('stock', {
              controller: 'StockController',
              templateUrl: 'public/template/stock.html',
              dependencies: ['stock']
            })
            .within()
              .segment('detail', {
                controller: 'StockDetailController',
                templateUrl: 'public/template/stock-detail.html',
                dependencies: ['stock'],
                label: 'Stock Detail'
              })
              .segment('history', {
                controller: 'StockHistoryController',
                templateUrl: 'public/template/stock-history.html',
                dependencies: ['stock']
              })
              .up()
            .segment('investor', {
              controller: 'InvestorController',
              templateUrl: 'public/template/investor.html',
              label: 'Investor',
              dependencies: ['investor']
            })
            .within()
              .segment('position', {
                controller: 'InvestorPositionController',
                templateUrl: 'public/template/investor-position.html',
                label: 'Investor Position',
                dependencies: ['investor']
              });*/

        $routeProvider
          .when('/', { controller: 'HomeController',
                       templateUrl: 'public/template/home.html',
                       label: 'Home' })
          .when('/stock/:stock', { controller: 'StockController',
                                   templateUrl: 'public/template/stock.html' })
          .when('/stock/:stock/detail', {
            controller: 'StockDetailController',
            templateUrl: 'public/template/stock-detail.html',
            label: 'Stock Detail'
          })
          .when('/stock/:stock/history', {
            controller: 'StockHistoryController',
            templateUrl: 'public/template/stock-history.html'
          })
          .when('/investor/:investor', {
            controller: 'InvestorController',
            templateUrl: 'public/template/investor.html',
            label: 'Investor'
          })
          .when('/investor/:investor/position/:position', {
            controller: 'InvestorPositionController',
            templateUrl: 'public/template/investor-position.html',
            label: 'Investor Position'
          })
          .otherwise({ redirectTo: '/' });
      }]);
  }
);