(function(t, $){
    // 'use strict';
    if($===undefined){
        return
    }

    var a = function(container, params){
        var s = this;
        s.counts = 2;
        s.container = $(container);
        s.perHeight = 0;
        s.params = params;
        if (s.params.counts) {
            s.counts = s.params.counts
        }
        s.time = s.params.time || 5000;
        s.init()
    }

    a.prototype.init = function(){
        var _this = this;

        if(_this.container){
            _this.getPerHeight()
                    .then(function(e){

                        var $element = _this.container;
                        // var timeInterval = $element.attr('time');
                        // timeInterval = (timeInterval!='5') ? timeInterval : 5;
                        // timeInterval = timeInterval*1000;
                        var nLen = $element.find('.playList').length;
                        $element.find('.playList .openlist').css('height', '46px');
                        var n = 1;
                        var counts = _this.counts;
                        var offsetHeight = _this.perHeight;
                        setInterval(function(){
                            $element.css({
                                'webkitTransitionDuration': '300ms',
                                'MozTransitionDuration': '300ms',
                                'msTransitionDuration': '300ms',
                                'OTransitionDuration': '300ms',
                                'transitionDuration': '300ms',
                                'webkitTransform': 'translate(0,-'+offsetHeight*n*counts+'px) translateZ(0)',
                                'MozTransform': 'translate(0,-'+offsetHeight*n*counts+'px) translateZ(0)',
                                'msTransform': 'translate(0,-'+offsetHeight*n*counts+'px) translateZ(0)',
                                'OTransform': 'translate(0,-'+offsetHeight*n*counts+'px) translateZ(0)',
                                'transform': 'translate(0,-'+offsetHeight*n*counts+'px) translateZ(0)'
                            });
                            n++;
                            n = (n>=nLen/counts) ? 0 : n;
                        }, _this.time);

                    })
        }
    }

    a.prototype.getPerHeight = function(){
        var _this = this;
        return new Promise(function(resolve,reject){
            _this.container.ready(function(e){
                console.log('hello')
                _this.perHeight = _this.container.children().height();
                resolve();
            })
        })
    }

    t.Paoma = a
})(window, $)