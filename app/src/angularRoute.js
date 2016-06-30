/**
 * Created by zhaott on 2016/2/19.
 */
angular.module("app",[
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
    'app.controllers',
    'app.indexService',
    'app.monitor',
    'app.monitorService',
    'app.alarm',
    'app.alarmService',
    'app.set',
    'app.setService',
    'app.help',
    'app.helpService',
    'app.history',
    'app.historyService'
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$compileProvider','$uiViewScrollProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $compileProvider,$uiViewScrollProvider) {


            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


            var token=base64decode(window.localStorage.getItem('token'));//便于测试
            console.log(" route--token="+token);
            $httpProvider.defaults.headers.get= {'token':token};
            $httpProvider.defaults.headers.post= {'token':token};
            $httpProvider.defaults.headers.put= {'token':token};
            $httpProvider.defaults.headers.delete= {'token':token};

            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
            $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
            //$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
            //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            //$httpProvider.defaults.transformRequest = [function(data) {
            //    /**
            //     * The workhorse; converts an object to x-www-form-urlencoded serialization.
            //     * @param {Object} obj
            //     * @return {String}
            //     */
            //    var param = function(obj) {
            //        var query = '';
            //        var name, value, fullSubName, subName, subValue, innerObj, i;
            //
            //        for (name in obj) {
            //            value = obj[name];
            //
            //            if (value instanceof Array) {
            //                for (i = 0; i < value.length; ++i) {
            //                    subValue = value[i];
            //                    fullSubName = name + '[' + i + ']';
            //                    innerObj = {};
            //                    innerObj[fullSubName] = subValue;
            //                    query += param(innerObj) + '&';
            //                }
            //            } else if (value instanceof Object) {
            //                for (subName in value) {
            //                    subValue = value[subName];
            //                    fullSubName = name + '[' + subName + ']';
            //                    innerObj = {};
            //                    innerObj[fullSubName] = subValue;
            //                    query += param(innerObj) + '&';
            //                }
            //            } else if (value !== undefined && value !== null) {
            //                query += encodeURIComponent(name) + '='
            //                    + encodeURIComponent(value) + '&';
            //            }
            //        }
            //
            //        return query.length ? query.substr(0, query.length - 1) : query;
            //    };
            //
            //    return angular.isObject(data) && String(data) !== '[object File]'
            //        ? param(data)
            //        : data;
            //}];

            $stateProvider
                /*主页*/
                .state('/', {
                    url: '/',
                    templateUrl: 'views/index/index.html',
                    controller:'indexCtrl'
                })
                .state('logout', {
                    url: '/logout',
                    controller:'logoutCtrl'
                })
                //.state('login', {
                //    url: '/login',
                //    templateUrl: 'views/login.html',
                //    controller:'LoginController'
                //})

                /*监控*/
                .state('monitor', {
                    url: '/monitor',
                    templateUrl: 'views/monitor/monitor.html',
                    controller: 'monitorCtrl'
                })
                /*告警*/
                .state('alarm', {
                    url: '/alarm',
                    templateUrl: 'views/alarm/alarm.html',
                    controller: 'alarmCtrl'
                })
                /*历史*/
                .state('history', {
                    url: '/history',
                    templateUrl: 'views/history/history.html',
                    controller: 'historyCtrl'
                })
                /*设置*/
                .state('set', {
                    url: '/set',
                    templateUrl: 'views/set/set.html',
                    controller:'setCtrl'
                })
                /*帮助*/
                .state('help', {
                    url: '/help',
                    templateUrl: 'views/help/help.html',
                    controller:'helpCtrl'
                })
                ///*模态框*/
                //.state('modal', {
                //    url: '/modal',
                //    templateUrl: 'views/base/modal.html'
                //})
                ///*模态框内创建监控模板路由*/
                //.state('modal.template', {
                //    url: '/modal-template',
                //    templateUrl: 'views/monitor/item-template/new-template.html'
                //})

            /*监控二级页面路由*/
                .state('monitor.http', {
                    url: '/monitor-http',
                    templateUrl: 'views/monitor/monitor-http/monitor-http.html',
                    controller: 'monitor.http'
                })
                .state('monitor.pay', {
                    url: '/monitor-pay',
                    templateUrl: 'views/monitor/monitor-pay.html',
                    controller: 'monitor.pay'
                 })
                .state('monitor.users', {
                    url: '/monitor-users',
                    templateUrl: 'views/monitor/monitor-users.html'
                })
                .state('monitor.platform', {
                    url: '/monitor-platform',
                    templateUrl: 'views/monitor/monitor-platform.html'
                })
                .state('monitor.item',{
                    url: '/item',
                    templateUrl: 'views/monitor/monitor-http/new-item.html',
                    controller: 'monitor.http'
                })
                .state('monitor.edit',{
                    url: '/monitor-item-edit/{monitorId}',
                    templateUrl: 'views/monitor/monitor-http/monitor-item-edit.html',
                    controller: 'monitor.edit'
                })
                .state('monitor.detail',{
                    url: '/monitor-item-detail/{monitorId}',
                    templateUrl: 'views/monitor/monitor-http/monitor-item-detail.html',
                    controller: 'monitor.detail'
                })
            /**
             * 告警-二级
             */
            .state('alarm.web', {
                url: '/alarm-web',
                templateUrl: 'views/alarm/alarm-web.html',
                controller: 'alarm.web'
            })
            .state('alarm.service', {
                url: '/alarm-service',
                templateUrl: 'views/alarm/alarm-service.html',
                controller: 'alarm.service'
            })
            //.state('  alarm.statistic', {
            //    url: '/alarm-statistic',
            //    templateUrl: 'views/alarm/alarm-statistic.html',
            //    controller: 'alarm.service'
            //    })

            /**
             * 设置-二级
             */
                //监控组
                .state('set.monitor', {
                    url: '/set-monitor',
                    templateUrl: 'views/set/set-monitor.html',
                    controller: 'set.monitor'
                })
                .state('set.alarm', {
                    url: '/set-alarm',
                    templateUrl: 'views/set/set-alarm.html',
                    controller: 'set.alarm'
                })
                .state('set.user', {
                    url: '/set-user',
                    templateUrl: 'views/set/set-user.html',
                    controller: 'set.user'
                })
                .state('set.template', {
                    url: '/set-template',
                    templateUrl: 'views/set/group/set-template-manage.html',
                    controller: 'set.template'
                })
                .state('set.template-new',{
                    url: '/template-new',
                    templateUrl: 'views/set/group/new-template.html',
                    controller: 'set.template'
                })
                /**
                 * 帮助-二级
                 */
                .state('help.whole', {
                    url: '/help-whole',
                    templateUrl: 'views/help/help-whole.html',
                    controller: 'help.whole'
                })
                .state('help.monitor', {
                    url: '/help-monitor',
                    templateUrl: 'views/help/help-monitor.html',
                    controller: 'help.monitor'
                });
            $urlRouterProvider.otherwise('/');
        }
    ]);


