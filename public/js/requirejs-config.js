var requirejsConfig = {
  baseUrl: '.',
  paths: {
    'angular': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular.min',
      'public/lib/angular/angular'
    ],
    'angular-route': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular-route.min',
      'public/lib/angular-route/angular-route.min'
    ],
    'ng-breadcrumbs': [
      'dist/ng-breadcrumbs.min',
      '//ianwalter.github.io/ng-breadcrumbs/dist/ng-breadcrumbs.min'
    ],
    'angular-route-segment': [
      '//cdnjs.cloudflare.com/ajax/libs/angular-route-segment/1.3.3/angular-route-segment.min'
    ]
  },
  shim: {
    'angular': {
      'exports': 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'ng-breadcrumbs': {
      deps: ['angular']
    },
    'angular-route-segment': {
      deps: ['angular']
    }
  }
};