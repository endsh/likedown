(function ($) {
    var toc = Markdown.Toc = {};
    var DEFAULTS = {
        marker: "\\[(TOC|toc)\\]",
        maxDepth: 6
    }

    toc.init = function (editor, postfix, options) {
        var options = $.extend({}, DEFAULTS, options)
        var preview = document.getElementById('wmd-preview' + postfix);
        editor.hooks.chain("onPreviewRefresh", function () {
            var tocExp = new RegExp("^\\s*" + options.marker + "\\s*$");
            var htmlToc = buildToc(preview, options.maxDepth)
            $(preview).children('p').each(function () {
                if (tocExp.test(this.innerHTML)) {
                    this.innerHTML = htmlToc
                }
            })
        });
    };

    // TOC element description
    function TocElement(tagName, anchor, text) {
        this.tagName = tagName;
        this.anchor = anchor;
        this.text = text;
        this.children = [];
    }
    TocElement.prototype.childrenToString = function() {
        if(this.children.length === 0) {
            return "";
        }
        if (!this.text) {
            var result = "";
            $(this.children).each(function () {
                result += this.toString()
            });
            return result;
        } else {   
            var result = "<ul>\n";
            $(this.children).each(function () {
                result += this.toString()
            });
            result += "</ul>\n";
            return result;
        }
    };
    TocElement.prototype.toString = function() {
        if (!this.text) {
            return this.childrenToString();
        }
        var result = "<li>";
        if(this.anchor && this.text) {
            result += '<a href="#' + this.anchor + '">' + this.text + '</a>';
        }
        result += this.childrenToString() + "</li>\n";
        return result;
    };

    // Transform flat list of TocElement into a tree
    function groupTags(array, level, maxDepth) {
        level = level || 1;
        var tagName = "H" + level;
        var result = [];

        var currentElement;
        function pushCurrentElement() {
            if(currentElement !== undefined) {
                if(currentElement.children.length > 0) {
                    currentElement.children = groupTags(currentElement.children, level + 1);
                }
                result.push(currentElement);
            }
        }

        $(array).each(function() {
            if(this.tagName != tagName) {
                if(level !== maxDepth) {
                    if(currentElement === undefined) {
                        currentElement = new TocElement();
                    }
                    currentElement.children.push(this);
                }
            }
            else {
                pushCurrentElement();
                currentElement = this;
            }
        });
        pushCurrentElement();
        return result;
    }

    function slugify(text) {
        return text.toLowerCase().replace(/\s/g, '-') // Replace spaces with -
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    };

    function has(array, item) {
        for (var i in array) {
            if (array[i] == item){
                return true;
            }
        }
        return false;
    }

    function buildToc(preview, maxDepth) {
        var anchorList = {};
        function createAnchor(element) {
            var id = element.id || slugify(element.textContent) || 'title';
            var anchor = id;
            var index = 0;
            while (has(anchorList, anchor)) {
                anchor = id + "-" + (++index);
            }
            anchorList[anchor] = true;
            // Update the id of the element
            element.id = anchor;
            return anchor;
        }

        var elementList = [];
        $(preview).children('h1, h2, h3, h4, h5, h6').each(function () {
            elementList.push(new TocElement(this.tagName, createAnchor(this), this.textContent));
        });
        elementList = groupTags(elementList, 1, maxDepth);
        return '<div class="toc">\n<ul>\n' + elementList.join("") + '</ul>\n</div>\n';
    }
})(jQuery);