angular.module('ng-package', ['ngSanitize', 'ngAnimate', 'ui.bootstrap', 'ui.select', 'ui.router', 'dialogs.main', 'oc.lazyLoad', 'ng.shims.placeholder', 'ngLocale', 'checklist-model'])
		.config(['datepickerConfig', '$translateProvider', 'dialogsProvider', function(datepickerConfig, $translateProvider, dialogsProvider) {
			datepickerConfig.showWeeks = false;
			dialogsProvider.setSize("md");
			dialogsProvider.useBackdrop("static");
			$translateProvider.translations('zh-CN',{
				DIALOGS_ERROR: "错误",
				DIALOGS_ERROR_MSG: "出现未知错误。",
				DIALOGS_CLOSE: "关闭",
				DIALOGS_PLEASE_WAIT: "请稍候",
				DIALOGS_PLEASE_WAIT_ELIPS: "请稍候...",
				DIALOGS_PLEASE_WAIT_MSG: "请等待操作完成。",
				DIALOGS_PERCENT_COMPLETE: "% 已完成",
				DIALOGS_NOTIFICATION: "通知",
				DIALOGS_NOTIFICATION_MSG: "未知应用程序的通知。",
				DIALOGS_CONFIRMATION: "确认",
				DIALOGS_CONFIRMATION_MSG: "确认要求。",
				DIALOGS_OK: "确定",
				DIALOGS_YES: "确认",
				DIALOGS_NO: "取消"
			});
		}])
