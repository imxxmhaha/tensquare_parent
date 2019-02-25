/**
 * IndexedList
 * 类似联系人应用中的联系人列表，可以按首字母分组
 * 右侧的字母定位工具条，可以快速定位列表位置
 * varstion 1.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 **/

(function($, window, document) {

    var classSelector = function(name) {
        return '.' + $.className(name);
    }



    var IndexedList = $.IndexedList = $.Class.extend({
        /**
         * 通过 element 和 options 构造 IndexedList 实例
         **/
        init: function(holder, options) {
            var self = this;
            self.options = options || {};
            self.box = holder;
            if (!self.box) {
                throw "实例 IndexedList 时需要指定 element";
            }
            self.createDom();
            self.findElements();
            self.caleLayout();
            self.bindEvent();
        },
        createDom: function() {
            var self = this;
            self.el = self.el || {};
            //styleForSearch 用于搜索，此方式能在数据较多时获取很好的性能
            self.el.styleForSearch = document.createElement('style');
            (document.head || document.body).appendChild(self.el.styleForSearch);
        },
        findElements: function() {
            var self = this;
            self.el = self.el || {};
            self.el.search = self.box.querySelector(classSelector('indexed-list-search'));
            self.el.searchInput = self.box.querySelector(classSelector('indexed-list-search-input'));
            self.el.searchClear = self.box.querySelector(classSelector('indexed-list-search') + ' ' + classSelector('icon-clear'));
            self.el.bar = self.box.querySelector(classSelector('indexed-list-bar'));
            self.el.barItems = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-bar') + ' a'));
            self.el.inner = self.box.querySelector(classSelector('indexed-list-inner'));
            self.el.items = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-item')));
            self.el.liArray = [].slice.call(self.box.querySelectorAll(classSelector('table-view') + ' li'));
            self.el.alert = self.box.querySelector(classSelector('indexed-list-alert'));
        },
        caleLayout: function() {
            var self = this;
            var withoutSearchHeight = (self.box.offsetHeight - self.el.search.offsetHeight) + 'px';
            self.el.bar.style.height = withoutSearchHeight;
            self.el.inner.style.height = withoutSearchHeight;
            var barItemHeight = ((self.el.bar.offsetHeight - 40) / self.el.barItems.length) + 'px';
            self.el.barItems.forEach(function(item) {
                item.style.height = barItemHeight;
                item.style.lineHeight = barItemHeight;
            });
        },
        scrollTo: function(group) {
            var self = this;
            var groupElement = self.el.inner.querySelector('[data-group="' + group + '"]');
            if (!groupElement || (self.hiddenGroups && self.hiddenGroups.indexOf(groupElement) > -1)) {
                return;
            }
            self.el.inner.scrollTop = groupElement.offsetTop;
        },
        bindBarEvent: function() {
            var self = this;
            var pointElement = null;

            var findStart = function(event) {
                if (pointElement) {
                    pointElement.classList.remove('active');
                    pointElement = null;
                }
                self.el.bar.classList.add('active');
                var point = event.changedTouches ? event.changedTouches[0] : event;
                pointElement = document.elementFromPoint(point.pageX, point.pageY);
                if (pointElement) {
                    var group = pointElement.innerText;
                    if (group && group.length == 1) {
                        pointElement.classList.add('active');
                        self.el.alert.innerText = group;
                        self.el.alert.classList.add('active');
                        self.scrollTo(group);
                    }
                }
                event.preventDefault();
            };

            var findEnd = function(event) {
                // console.log('findEnd');
                self.el.alert.classList.remove('active');
                self.el.bar.classList.remove('active');
                if (pointElement) {
                    pointElement.classList.remove('active');
                    pointElement = null;
                }
            };

            self.el.bar.addEventListener($.EVENT_MOVE, function(event) {
                findStart(event);
            }, false);
            self.el.bar.addEventListener($.EVENT_START, function(event) {
                findStart(event);
            }, false);
            document.body.addEventListener($.EVENT_END, function(event) {
                findEnd(event);
            }, false);
            document.body.addEventListener($.EVENT_CANCEL, function(event) {
                findEnd(event);
            }, false);
        },
        search: function(keyword) {
            var self = this;
            keyword = (keyword || '').toLowerCase();
            var selectorBuffer = [];
            var groupIndex = -1;  //group项的位置
            var itemCount = 0;  //某个group中item的数量
            var liArray = self.el.liArray;
            var itemTotal = liArray.length;
            self.hiddenGroups = [];

            var checkGroup = function(currentIndex, last) {
                //一个group项拥有的item个数 >= 这个group项的位置与上一个group项的位置的间距，那就隐藏上一个group项 （因为最后一项是没下一个group，所以用last区分最后一个
                if (itemCount >= currentIndex - groupIndex - (last ? 0 : 1)) {
                    selectorBuffer.push(classSelector('table-view li') + ':nth-child(' + (groupIndex + 1) + ')');
                    self.hiddenGroups.push(liArray[groupIndex]);
                };
                groupIndex = currentIndex;
                itemCount = 0;

                //如果是group项切当前group项没有item项且排在最后一个
                if (!last && currentIndex >= itemTotal - 1) {
                    selectorBuffer.push(classSelector('table-view li') + ':nth-child(' + (currentIndex + 1) + ')');
                }
            }

            if(keyword.length){
                liArray.forEach(function(item, index) {
                    var currentIndex = liArray.indexOf(item);
                    //group项
                    if (item.classList.contains($.className('indexed-list-group'))) {
                        var last = false;
                        checkGroup(currentIndex, false);
                    }
                    //item项，非group项
                    else {
                        var text = (item.innerText || '').toLowerCase();
                        var value = (item.getAttribute('data-value') || '').toLowerCase();
                        var tags = (item.getAttribute('data-tags') || '').toLowerCase();
                        if (keyword && text.indexOf(keyword) < 0 &&
                                value.indexOf(keyword) < 0 &&
                                tags.indexOf(keyword) < 0) {
                            selectorBuffer.push(classSelector('table-view li') + ':nth-child(' + (currentIndex + 1) + ')');
                            itemCount++;
                        }
                        //最后一个
                        if (currentIndex >= itemTotal - 1) {
                            checkGroup(currentIndex, true);
                        }
                    }
                });
            }
            //通过批量改变css的方法来隐藏非关键字
            //所有都隐藏
            if (selectorBuffer.length >= itemTotal) {
                self.el.inner.classList.add('empty');
                self.el.inner.classList.add('several');
            }
            //部分隐藏
            else if (selectorBuffer.length > 1) {
                self.el.inner.classList.remove('empty');
                self.el.inner.classList.add('several');
                self.el.styleForSearch.innerText = selectorBuffer.join(', ') + "{display:none;}";
            }
            //无隐藏
            else {
                self.el.inner.classList.remove('empty');
                self.el.inner.classList.remove('several');
                self.el.styleForSearch.innerText = "";
            }
        },
        bindSearchEvent: function() {
            var self = this;
            var inputTimer;
            self.el.searchInput.addEventListener('input', function() {
                console.log('ww')
                var keyword = this.value;

                clearTimeout(inputTimer);
                inputTimer = setTimeout(function(){
                    self.search(keyword);
                }, 500);

            }, false);
            $(self.el.search).on('tap', classSelector('icon-clear'), function() {
                self.search('');
            }, false);
        },
        bindEvent: function() {
            var self = this;
            self.bindBarEvent();
            self.bindSearchEvent();
        }
    });

    //mui(selector).indexedList 方式
    $.fn.indexedList = function(options) {
        //遍历选择的元素
        this.each(function(i, element) {
            if (element.indexedList) return;
            element.indexedList = new IndexedList(element, options);
        });
        return this[0] ? this[0].indexedList : null;
    };

})(mui, window, document);