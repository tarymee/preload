;(function(win, doc) {
	function preload(picData,config) {
		if (!picData) return;
		// 默认配置
		var initConfig = {
			handleFileLoad: function() {},
			handleComplete: function() {},
			handleError: function() {}
		};
		config = config || {};
		this.config = this.extend(config, initConfig, false);
		this.picData = picData;
		this.init();
	};
	preload.prototype = {
		// 初始化
		init: function() {
			var _this = this;

			var config = _this.config;
			var picData = _this.picData;
			// 所有图片数量
			var total = picData.length;
			// 已经加载的图片数量
			var loaded = 0;
			// 错误的图片数量
			var errored = 0;


			function handle(obj,type) {
				var para = {};
				para.total = total;
				para.loaded = loaded;
				para.errored = errored;
				para.progress = (loaded + errored)/total;
				para.percent = parseInt(para.progress * 100) + "%";

				if (type == "load" || type == "complete") {
					if (config.handleFileLoad && typeof(config.handleFileLoad) == "function") {
						config.handleFileLoad(obj,para);
					};
				}else if (type == "error" || type == "abort") {
					if (config.handleError && typeof(config.handleError) == "function") {
						config.handleError(obj,para);
					};
				}

				if (para.progress == 1) {
					if (config.handleComplete && typeof(config.handleComplete) == "function") {
						config.handleComplete(obj,para);
					};
				};
				obj = obj.onabort = obj.onload = obj.onerror = null;
			}




			for (var i = 0; i < picData.length; i++) {
				(function (m) {
					var img = new Image();
					img.src = picData[m];

					if (img.complete) {
						// console.log("有缓存");
						loaded++;
						handle(img,"complete");
						return;
					};

					img.onload = function() {
						loaded++;
						handle(img,"load");
					}

					img.onabort = function () {
						errored++;
						handle(img,"abort");
					}

					img.onerror = function () {
						errored++;
						handle(img,"error");
					}

				})(i)
			};
		},

		// 对 json 对象进行更新扩展，会修改待更新扩展的对象，同时将其返回。
		extend: function(destination, source, override, replacer) {
			if (override === undefined) override = true;
			for (var property in source) {
				if (override || !(property in destination)) {
					if (replacer) replacer(property);
					else destination[property] = source[property];
				}
			}
			return destination;
		}
	};
	window.preload = preload;
})(window, document);

