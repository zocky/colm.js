// Colm.js 0.8 - (c) 2015 Zoran Obradović, Ljudmila.org, GPL 2.0

colm = (function() {
  var init_done;
  var array = function(a) {
    return Array.prototype.slice.call(a,0);
  }
  var dget = function(el,s) {
    return el.getAttribute('data-colm-'+s);
  }
  var dset = function(el,s,v) {
    el.setAttribute('data-colm-'+s,v);
  }
  var each = function(a,fn) {
    array(a).forEach(fn);
  }
  var doc = document;
  var colm = function colm() {
    if (!init_done) {
      init_done = true;
      var s = doc.createElement('style');
      s.innerHTML = (
        '\n  [data-colm-width][data-colm-processed] > * {-webkit-flex:1 1 0;flex:1 1 0;}'
      + '\n  [data-colm-width][data-colm-processed] {display:-webkit-flex; display:flex;-webkit-flex-flow:row;flex-flow:row;-webkit-align-items:flex-start;align-items:flex-start;}'
      );
      doc.head.appendChild(s);
    }
    each(doc.querySelectorAll('[data-colm-width]'),function(cont) {
      var wMax = +dget(cont,'width');
      var wMin = +dget(cont,'min-width');
      
      var wCont = cont.offsetWidth;
      var cMin = Math.max(Math.floor(wCont/wMax),1);
      var cMax = cMin + 1;
      var wcMin = wCont / cMin;
      var wcMax = wCont / cMax;
      
      var dMin = Math.abs(wMax - wcMin);
      var dMax = Math.abs(wMax - wcMax);
      
      var cCount = dMin < dMax || wcMax < wMin ? cMin : cMax;

      var children;
      
      if (dget(cont,'processed')) {
        if (cont.children.length == cCount) return;
        children = [];
        each(cont.children, function(a){
          each(a.children, function(b){
            children[dget(b,'index')]=b;
          });
        })
      } else {
        children = array(cont.children);
        dset(cont,'processed','true');
        dset(cont,'count',0);
      }
      dset(cont,'columns',cCount);
      cont.innerHTML = '';
      for (var i = 0; i<cCount; i++) {
        cont.appendChild(doc.createElement('DIV'));
      }
      colm.appendTo(cont,children);
    })
  }
  colm.appendTo = function (cont, content) {
      if (typeof cont == 'string') cont = doc.querySelector(cont);
      if (typeof content == 'string') content = doc.createRange().createContextualFragment(content).children;
      
      var columns = array(cont.children);
      var cnt = dget(cont,'count');
      each(content,function(child) {
        if (!dget(child,'index')) {
          dset(child,'index',cnt++);
        }
        var place = + dget(child,'place');
        
        if (!place) {
          var c = columns.reduce(function(a,b) {
            return !a || b.offsetHeight<a.offsetHeight ? b : a;
          },null);
          c.appendChild(child);
        } else {
          if (place<0) place = Math.max(0,columns.length + place);
          else place = Math.min(columns.length-1,place-1);
          columns[place].appendChild(child);
        }
      });
      dset(cont,'count',cnt);
  }
  addEventListener('resize', colm);      
  addEventListener('load', colm);      
  return colm;
})();
