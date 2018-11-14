function ipadScrollBar() {
  var oBox = getByClass(document, 'ipad-cont')[0];
  var barWrapper = getByClass(document, 'ipad-bar')[0];
  var bar = getByClass(barWrapper, 'bar')[0];
  var cont = getByClass(document, 'textArea')[0];


  var oBox_h = oBox.offsetHeight;
  var barWrapper_h = barWrapper.offsetHeight;
  var cont_h = cont.offsetHeight;
  var disY = 0;

  var scale = cont_h / oBox_h;
  var barHeight = barWrapper_h / scale;

  if (scale <= 1) {
    barWrapper.style.display = 'none';
  }

  $(bar).animate({height: barHeight});

  bar.onmousedown = function (ev) {
    disY = ev.clientY - this.offsetTop;

    document.onmousemove = function (ev) {
      var T = ev.clientY - disY;

      moving(T);
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };

    return false;
  };

  mouseWheel(oBox, function () {
    disY -= 20;
    moving(disY);
  }, function () {
    disY += 20;

    moving(disY);
  });

  barWrapper.onclick = function (ev) {
    moving(ev.offsetY);
  };

  function moving(val) {
    scale = cont.offsetHeight / oBox.offsetHeight;

    if (scale > 1) {
      val <= 0 && (val = 0);
      val >= barWrapper_h - bar.offsetHeight && (val = barWrapper_h - bar.offsetHeight);

      bar.style.top = val + 'px';
      cont.style.marginTop = -val * scale + 'px';
    }
  };

  function mouseWheel(obj, upFn, downFn) {
    obj.onmousewheel = fn;

    if (obj.addEventListener) {
      obj.addEventListener("DOMMouseScroll", fn, false);
    }

    function fn(ev) {
      var oEvent = ev || window.event;

      if (oEvent.wheelDelta) {
        oEvent.wheelDelta > 0 ? upFn() : downFn();
      } else {
        oEvent.detail < 0 ? upFn() : downFn();
      }

      if (oEvent.preventDefault) {
        oEvent.preventDefault();
      } else {
        oEvent.returnValue = false;
      }
    };
  };
};

function getByClass(oParent, cls) {
  var aElem = oParent.getElementsByTagName("*");
  var result = [];
  var classArr = [];

  for (var i = 0; i < aElem.length; i++) {
    var elem_cls = aElem[i].className;

    // 如果里面无class，则跳过本次循环
    if (elem_cls) {
      classArr = elem_cls.split(" ");      
    } else {
      continue;
    }

    if (classArr.length > 1) {
      for (var j = 0; j < classArr.length; j++) {
        if (classArr[j] === cls) {
          result.push(aElem[i]);

          break; // 已经找到一个的话，就退出本次循环
        }
      }
    } else {
      if (elem_cls === cls) {
        result.push(aElem[i]);
      }
    }
  }

  return result;
}