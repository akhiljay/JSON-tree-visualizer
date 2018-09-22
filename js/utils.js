window.onLoad = (function() {
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fun /*, thisp*/ ) {
			var len = this.length >>> 0;
			if (typeof fun != "function") {
				throw new TypeError();
			}

			var thisp = arguments[1];
			for (var i = 0; i < len; i++) {
				if (i in this) {
					fun.call(thisp, this[i], i, this);
				}
			}
		};
	}
})();