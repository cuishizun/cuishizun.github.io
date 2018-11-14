function elasticText() {
  var args = arguments;

  function mouserEvent(event) {
    var e = event || window.event;
    var left = this.offsetLeft;
    var top = this.offsetTop;
    var x = e.clientX ? e.clientX : e.pageX;
    var y = e.clientY ? e.clientY : e.pageY;
    return {
      x: x - left,
      y: y - top
    }
  }

  function ps() {
    return this.every(function(item, index, arr) {
      return Math.abs(item) < 0.1;
    })
  }

  function triangleCalc(w, h, m, n, arr, fs) {
    var z = 0;
    var posarr = [];
    if(n.y < m.y) {
      z = 1;
    } else {
      z = -1;
    }
    arr.map(function(item, index, arr) {
      var l = arr.length - 1;
      var lw = index * fs + fs / 2;
      var rw = (l - index) * fs + fs / 2;
      if(lw < m.x) {
        ip = z * (lw / m.x * (n.y - m.y) * z).toFixed(2);
      } else {
        ip = z * (rw / (fs * l - m.x) * (n.y - m.y) * z).toFixed(2);
      }
      if(ip != 0) {
        posarr.push(ip);
      }
      item.style = "display:inline-block;transform:translateY(" + ip + "px)";
    })
    return posarr;
  }

  function back(ac, arr, _this) {
    if(ac.length === 0) {
      return
    }

    function c() {
      if(ps.call(ac)) {
        clearInterval(_this.ani);
        arr.forEach(function(item) {
          return item.style = '';
        })
        return false;
      }
      arr.forEach(function(item, index, arr) {
        var np = ac[index] = -ac[index] * .9;
        item.style = "display:inline-block;transform:translateY(" + np + "px)";
      });
    }
    clearInterval(_this.ani);
    _this.ani = setInterval(c, 30)
  }

  function mFn(obj) {
    var _this = this;
    var id = obj.id,
      fs = obj.fontSize,
      colr = obj.color,
      ct = obj.content;
    var tf = document.getElementById(id);
    if(tf === null || tf === void 0) {
      throw new Error('请检查id是否错误');
    }
    if(typeof fs !== 'string') {
      fs = fs.toString();
    }
    if(!/^\d{2}(|px)$/.test(fs)) {
      throw new Error('请检查fontSize格式是否错误');
    } else {
      fs = fs.match(/^\d{2}/)[0];
    }
    var textBox = document.createElement('div');
    textBox.setAttribute('class', 'eBox');

    var frg = document.createDocumentFragment();
    var arr = ct.split('');
    var textarr = [];
    arr.forEach(function(item, val) {
      var dom = document.createElement('span');
      dom.innerText = item;
      textarr.push(dom);
      frg.appendChild(dom);
    })
    textBox.appendChild(frg);
    tf.innerHTML = '';
    textBox.style = "display:inline-block;width:" + fs * arr.length + "px;font-size:" + fs + "px;cursor:pointer;color:" + colr + "";
    tf.appendChild(textBox);

    textBox.onmouseover = function(event) {
      var w = this.offsetWidth;
      var h = this.offsetHeight;
      var m = mouserEvent.call(this, event);
      var ac = [];
      textBox.onmousemove = function(event) {
        var n = mouserEvent.call(this, event);
        if(Math.abs(m.y - n.y) < 1.5 * h) {
          ac = triangleCalc(w, h, m, n, textarr, fs);
        } else {
          back(ac, textarr, _this);
        }
      }
      textBox.onmouseout = function() {
        back(ac, textarr, _this);
      }
    }
  }
  if(arguments.length) {
    Array.prototype.forEach.call(args, function(item) {
      new mFn(item);
    })
  }
}