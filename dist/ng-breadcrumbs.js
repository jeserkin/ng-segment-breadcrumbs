/**
 * ng-breadcrumb.js - v0.4.2 - A better AngularJS service to help with
 * breadcrumb-style navigation between views.
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 * @editor Eugene Serkin (http://art-coder.com)
 */
(function(angular) {
  'use strict';

  angular
    .module('ng-breadcrumbs', [])
    .factory('breadcrumbs', [
      '$rootScope',
      '$location',
      '$route',
      '$routeSegment',
      function ($rootScope, $location, $route, $routeSegment) {
        var BreadcrumbService = {
          breadcrumbs: [],
          get: function(options) {
            this.options = options || this.options;
            if (this.options) {
              for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                  for (var index in this.breadcrumbs) {
                    if (this.breadcrumbs.hasOwnProperty(index)) {
                      var breadcrumb = this.breadcrumbs[index];
                      if (breadcrumb.label === key) {
                        breadcrumb.label = this.options[key];
                      }
                    }
                  }
                }
              }
            }
            return this.breadcrumbs;
          },
          generateBreadcrumbs: function() {
            var routes = $route.routes,
              _this = this,
              params,
              param,
              path = '',
              originalPath = '',
              fullSegmentName = '';

            if ($routeSegment) {
              this.breadcrumbs = [];
              params = $routeSegment.$routeParams;

              angular.forEach($routeSegment.chain, function(segment, index) {
                if (segment === null) {
                  // @TODO: Need to handle
                  return;
                }

                if (fullSegmentName.trim() !== '') {
                  fullSegmentName += '.' + segment.name;
                }
                else {
                  fullSegmentName = segment.name;
                }

                try {
                  path = $routeSegment.getSegmentUrl(fullSegmentName);
                }
                catch (e) {
                  return;
                }
                originalPath = $routeSegment.getRawSegmentUrl(fullSegmentName);

                var originalPathSegments = '';
                if (originalPath.trim().length > 1) {
                  originalPathSegments = originalPath.trim().slice(1).split('/');
                }
                else {
                  originalPathSegments = originalPath.trim().split('/');
                }

                angular.forEach(originalPathSegments, function(originalSegment, index) {
                  param = originalSegment[0] === ':' &&
                  typeof params[originalSegment
                    .slice(1, originalSegment.length)] !== 'undefined' ?
                    params[originalSegment.slice(1, originalSegment.length)] :
                    false;
                });

                if (routes[originalPath] &&
                  (segment.params['label'] || param) &&
                  !routes[originalPath].excludeBreadcrumb) {
                  _this.breadcrumbs.push({
                    path: path,
                    originalPath: originalPath,
                    label: segment.params['label'] || param,
                    param: param
                  });
                }
              });
            }
          }
        };

        // We want to update breadcrumbs only when a route is actually changed
        // as $location.path() will get updated immediately (even if route
        // change fails!)
        $rootScope.$on('$routeChangeSuccess', function() {
          BreadcrumbService.generateBreadcrumbs();
        });

        $rootScope.$watch(
          function() {
            return BreadcrumbService.options;
          },
          function() {
            BreadcrumbService.generateBreadcrumbs();
          }
        );

        BreadcrumbService.generateBreadcrumbs();

        $rootScope.$on('routeSegmentChange', function(index, segment) {
          BreadcrumbService.generateBreadcrumbs();
        });

        return BreadcrumbService;
      }
    ]);
})(angular);
