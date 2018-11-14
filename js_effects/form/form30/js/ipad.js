/**
 * Coder: EzrealY
 * Date: 2017.08.15
 * Email: 1005526074@qq.com
 * Website: www.summerstarry.com
 * More: http://www.jq22.com/mem310935
 * 请在转载时保留作者信息，多谢！
 */

;(function ($, window, document, undefined) {
  
  var Ipad = function (elem, options) {
    this.defaults = {
      width: 200,
      height: 200,
      limitedWidth: 200,
      limitedHeight: 200,
      dragLimited: true
    };
    this.opts = $.extend({}, this.defaults, options);

    var self = this;
    this.$ipad = elem;
    this.$ipadTitle = this.$ipad.find('.ipad-title');
    this.$ipadT = this.$ipad.find('.T');
    this.$ipadR = this.$ipad.find('.R');
    this.$ipadB = this.$ipad.find('.B');
    this.$ipadL = this.$ipad.find('.L');
    this.$ipadTR = this.$ipad.find('.TR');
    this.$ipadBR = this.$ipad.find('.BR');
    this.$ipadBL = this.$ipad.find('.BL');
    this.$ipadLT = this.$ipad.find('.LT');
    this.$ipadCont = this.$ipad.find('.ipad-cont');
    this.$ipadBar = this.$ipad.find('.ipad-bar');
    this.$bar = this.$ipadBar.find('.bar');

    this.limitedWidth = this.opts.width < this.opts.limitedWidth ? this.opts.width : this.opts.limitedWidth;
    this.limitedHeight = this.opts.height < this.opts.limitedHeight ? this.opts.height : this.opts.limitedHeight;

    // console.log(this.opts);
  };

  Ipad.prototype = {
    moveResize: function (handle, setLeft, setTop, lockX, lockY) {
      var self = this;

      handle.bind('mousedown', function (ev) {
        var offsetW = self.$ipad.width();
        var offsetH = self.$ipad.height();
        var offsetL = self.$ipad.offset().left;
        var offsetT = self.$ipad.offset().top;
        var disX = ev.clientX;
        var disY = ev.clientY;

        var viewWidth = $(document).width();
        var viewHeight = $(document).height();
        var maxL = viewWidth - offsetW - offsetL;
        var maxT = viewHeight - offsetH - offsetT;

        this.setCapture && this.setCapture();

        $(document).bind('mousemove', function (ev) {
          var ipadCont_h = self.$ipadCont.height();
          var ipadTextarea_h = $('.textArea').height();
          var scale = 0;

          if (setLeft) {
            self.$ipad.css({width: offsetW - (ev.clientX - disX)});
          } else {
            lockY || self.$ipad.css({width: offsetW + (ev.clientX - disX)});
          }

          if (setTop) {
            self.$ipad.css({height: offsetH - (ev.clientY - disY)});

            barDisplay();
          } else {
            lockX || self.$ipad.css({height: offsetH + (ev.clientY - disY)});

            barDisplay();
          }

          function barDisplay() {
            self.$ipadCont.css({height: self.$ipad.height() - self.$ipadTitle.height() - 20});
            self.$ipadBar.css({height: self.$ipadCont.height()});

            scale = ipadTextarea_h / ipadCont_h;
            if (scale <= 1) {
              self.$ipadBar.hide()
            } else {
              self.$ipadBar.show()

              self.$bar.css({height: self.$ipadBar.height() / scale});
            }
          };
          
          setLeft && (self.$ipad.css({left: offsetL + (ev.clientX - disX)}));
          setTop && (self.$ipad.css({top: offsetT + (ev.clientY - disY)}));

          if (self.$ipad.width() <= self.limitedWidth) {
            self.$ipad.css({width: self.limitedWidth});

            setLeft && (self.$ipad.css({left: viewWidth - maxL - self.limitedWidth}));
          }

          if (self.$ipad.height() <= self.limitedHeight) {
            self.$ipad.css({height: self.limitedHeight});
            self.$ipadCont.css({height: self.limitedHeight - self.$ipadTitle.height() - 20});

            setTop && (self.$ipad.css({top: viewHeight - maxT - self.limitedHeight}));

            self.$ipadBar.css({height: self.$ipadCont.height()});
            scale = ipadTextarea_h / ipadCont_h;
            self.$bar.css({height: self.$ipadBar.height() / scale});
          }
        });

        $(document).on('mouseup', function () {
          $(this).unbind('mousemove');
          $(this).unbind('mouseup');

          this.releaseCapture && this.releaseCapture();
        });

        return false;
      });
    },

    drag: function () {
      var self = this;

      this.$ipadTitle.bind('mousedown', function (ev) {
        var disX = ev.clientX - self.$ipad.offset().left;
        var disY = ev.clientY - self.$ipad.offset().top;

        this.setCapture && this.setCapture();

        $(document).bind('mousemove', function (ev) {
          var maxL = $(this).width() - self.$ipad.width();
          var maxT = $(this).height() - self.$ipad.height();
          var iL = ev.clientX - disX;
          var iT = ev.clientY - disY;

          if (self.opts.dragLimited) {
            iL <= 0 && (iL = 0);
            iL >= maxL && (iL = maxL);
            iT <= 0 && (iT = 0);
            iT >= maxT && (iT = maxT);
          }

          self.$ipad.css({left: iL, top: iT});
        });

        $(document).on('mouseup', function () {
          $(this).unbind('mousemove');
          $(this).unbind('mouseup');

          this.releaseCapture && this.releaseCapture();
        });

        return false;
      });
    },

    initalPad: function () {
      this.$ipad.css({width: this.opts.width, height: this.opts.height});
      this.$ipadCont.css({height: this.opts.height - this.$ipadTitle.height() - 20});
      this.$ipadBar.css({height: this.$ipadCont.height()});
    },

    inital: function () {
      this.initalPad();
      this.drag();
      this.moveResize(this.$ipadT, false, true, false, true);
      this.moveResize(this.$ipadR, false, false, true, false);
      this.moveResize(this.$ipadB, false, false, false, true);
      this.moveResize(this.$ipadL, true, false, true, false);
      this.moveResize(this.$ipadTR, false, true, false, false);
      this.moveResize(this.$ipadBR, false, false, false, false);
      this.moveResize(this.$ipadBL, true, false, false, false);
      this.moveResize(this.$ipadLT, true, true, false, false);
    },

    constructor: Ipad
  };

  $.fn.ipad = function (options) {
    var ipad = new Ipad(this, options);

    return ipad.inital();
  };

})(jQuery, window, document, undefined);