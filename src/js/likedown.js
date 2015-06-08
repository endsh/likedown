
+function ($) {
	"use strict";

	var Likedown = function (element, options) {
		this.$element = $(element)
		this.options = $.extend({}, Likedown.DEFAULTS, options)
		this.options.postfix = this.options.postfix || this.$element.data("postfix") || ""
		this.init()
	}

	Likedown.VERSION = "0.0.1"

	Likedown.DEFAULTS = {
		table_class: "table table-bordered",
		highlighter: "highlight",
		help: function () {
			window.open('http://likedown.chiki.org/');
		}
	}

	Likedown.prototype.init = function () {
		var that = this
		var converter = this.converter = new Markdown.Converter()
		var editor = this.editor = new Markdown.Editor(converter, this.options.postfix, {
			handler: this.options.help
		})
		Markdown.Extra.init(converter, this.options)
		Markdown.MathJax.init(editor, this.options.postfix)
		editor.hooks.chain("onPreviewRefresh", this.onPreviewRefresh)
		editor.hooks.chain("onPreviewRefresh", this.onAsyncPreview)
		editor.hooks.set("insertLinkDialog", function (callback) {
			return that.insertLinkDialog(callback)
		})
		editor.hooks.set("insertImageDialog", function (callback) {
			return that.insertImageDialog(callback)
		})
		editor.run()
		this.initModals()
	}

	Likedown.prototype.initModals = function () {
		var that = this
		$(".action-insert-link").click(function () {
			var value = $("#input-insert-link").val()
			if(value !== undefined) {
				that.insertCallback(value)
				that.insertCallback = undefined
			}
		})
		$(".action-insert-image").click(function () {
			var value = $("#input-insert-image").val()
			if(value !== undefined) {
				that.insertCallback(value)
				that.insertCallback = undefined
			}
		})
		$(".modal-insert-link, .modal-insert-image").on('hidden.bs.modal', function () {
			if (that.insertCallback !== undefined) {
				that.insertCallback(null)
				that.insertCallback = undefined
			}
		})
	}

	Likedown.prototype.resetModalInputs = function () {
		$("#input-insert-link, #input-insert-image").val("")
	}

	Likedown.prototype.insertLinkDialog = function (callback) {
		this.insertCallback = callback
		this.resetModalInputs()
		$('.modal-insert-link').modal()
		return true
	}

	Likedown.prototype.insertImageDialog = function (callback) {
		this.insertCallback = callback
		this.resetModalInputs()
		$('.modal-insert-image').modal()
		return true
	}

	Likedown.prototype.onPreviewRefresh = function () {
		$("pre > code").each(function () {
			try {
				!this.highlighted && hljs.highlightBlock(this)
				this.highlighted = true
			} catch (e) {}
		})

		$("pre > code.language-sequence").each(function () {
			try {
				var diagram = Diagram.parse(this.textContent)
				var parent = this.parentNode
				var container = document.createElement("div")
				container.className = "sequence-diagram"
				parent.parentNode.replaceChild(container, parent)
				diagram.drawSVG(container, { theme: "simple" })
			} catch (e) {}
		})

		$("pre > code.language-flow").each(function () {
			try {
				var chart = flowchart.parse(this.textContent)
				var parent = this.parentNode
				var container = document.createElement("div")
				container.className = "flow-chart"
				parent.parentNode.replaceChild(container, parent)
				chart.drawSVG(container, {
					"line-width": 2,
					"font-family": "sans-serif",
					"font-weight": "normal"
				})
			} catch (e) {}
		})
	}

	var onAsyncPreviewListenerList = [ Markdown.MathJax.onAsyncPreview ]
	Likedown.prototype.onAsyncPreview = function() {
		function recursiveCall(callbackList) {
			var callback = callbackList.length ? callbackList.shift() : function() {}
			callback(function () {
				recursiveCall(callbackList)
			})
		}

		recursiveCall(onAsyncPreviewListenerList.concat([
			function (callback) {
				callback()
			}
		]));
	};

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data = $this.data("likedown")
			var options = typeof option == "object" && option

			if (!data) $this.data("likedown", (data = new Likedown(this, options)))
			if (typeof option == "string") data[option]()
		})
	}

	var old = $.fn.likedown

	$.fn.likedown = Plugin
	$.fn.likedown.Constructor = Likedown

	$.fn.likedown.noConflict = function () {
		$.fn.likedown = old
		return this
	}

	$(function () {
		$('[data-type="likedown"]').likedown()
	});	

}(jQuery);