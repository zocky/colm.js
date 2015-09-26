// Colm.js 0.9a - (c) 2015 Zoran Obradović, Ljudmila.org, GPL 2.0

colm = (function() {
  var init_done;
  var array = function(a) {
    return 'length' in a ? Array.prototype.slice.call(a,0) : [a];
  }
  var dget = function(el,s) {
    return el.getAttribute('data-colm-'+s);
  }
  var dset = function(el,s,v) {
    el.setAttribute('data-colm-'+s,v);
  }
  var drem = function(el,s) {
    el.removeAttribute('data-colm-'+s);
  }
  var each = function(a,fn) {
    array(a).forEach(fn);
  }
  var remove = function(el) {
    return el.parentNode.removeChild(el);
  }
  var doc = document;
  var colm = function colm() {
    if (!init_done) {
      if (document.body.style.flexWrap !== undefined) return;
      init_done = true;
      var s = doc.createElement('style');
      function pref(a,b) {
        
        return '\n[data-colm-processed]' + a.replace(/\bd-\b/g,'data-colm-') + ' {' + b.split(';').map(function(s){
          if (!s.match(/\bx-/)) return s;
          return s.replace(/\bx-/,'-webkit-') +';'+ s.replace(/\bx-/,'');
        }).join(';') + '}\n';
      }
      function justify(a,b) {
        return pref('[d-align-columns~="'+a+'"]','x-justify-content:'+b);
      }
      function align(a,b) {
        return pref('[d-done][d-align-items~="'+a+'"] > *','x-justify-content:'+b);
      }
      s.innerHTML = (
        pref('','display:x-flex; x-flex-flow:row;x-align-items:flex-start;x-justify-content:flex-start')
      + pref(' > *', 'display:x-flex;x-flex-flow:column;x-justify-content:flex-start;box-sizing:border-box;x-flex-basis:100%')
      + pref('[d-align-items~="stretch"] > * > *','x-flex-grow:1')
      + pref('[d-align-columns~="stretch"] > *','x-flex-grow:1')
      + pref('[d-min-width] > *','x-flex-shrink:1')
      + pref('[d-done]','x-align-items:stretch')
      + justify('left','flex-start')
      + justify('right','flex-end')
      + justify('center','center')
      + justify('justify','space-between')
      + justify('space','space-around')
      + justify('stretch','stretch')
      + align('top','flex-start')
      + align('bottom','flex-end')
      + align('center','center')
      + align('justify','space-between')
      + align('space','space-around')
      + align('stretch','stretch')
      );
      doc.head.appendChild(s);
    }
    each(doc.querySelectorAll('[data-colm-width]'),function(cont) {
      var wMax = +dget(cont,'width');
      var wMin = +dget(cont,'min-width');
      
  
      var cs = getComputedStyle(cont);
      function fget(p) {
        return parseFloat(cs[p]);
      }
      var w = fget('width');
      if (cs['box-sizing'] == 'border-box') {
        w -= fget('border-left-width') + fget('padding-left') + fget('padding-right') + fget('border-right-width');
      }
          
      var wCont = w;
      var cMin = Math.max(Math.floor(wCont/wMax),1);
      var cCount;
      if (wMin) {
        var cMax = cMin + 1;
        var wcMin = wCont / cMin;
        var wcMax = wCont / cMax;
        
        var dMin = Math.abs(wMax - wcMin);
        var dMax = Math.abs(wMax - wcMax);
        
        cCount = dMin < dMax || wcMax < wMin ? cMin : cMax;
      } else {
        cCount = cMin;
      }
      var wCol = wCont / cCount;
      var children = [];
      
      if (dget(cont,'processed')) {
        if (cont.children.length == cCount) return;
        each(cont.children, function(a){
          each(a.children, function(b){
            children[dget(b,'index')] = remove(b);
          });
        })
      } else {
        children = array(cont.children).map(remove);
        dset(cont,'processed','true');
        dset(cont,'count',0);
      }
      dset(cont,'columns',cCount);
      cont.innerHTML = '';
      for (var i = 0; i<cCount; i++) {
        var column = doc.createElement('DIV');
        dset(column,'column',i+1);
        dset(column,i==0 ? 'first' : 'not-first','true');
        dset(column,i==cCount-1 ? 'last' : 'not-last','true');
        column.setAttribute('style','-webkit-flex-basis:'+wMax+'px;flex-basis:'+wMax+'px');
        cont.appendChild(column);
      }
      colm.appendTo(cont,children);
    })
  }

  colm.appendTo = function (cont, content) {
    if (typeof cont == 'string') cont = doc.querySelector(cont);
    if (typeof content == 'string') content = doc.createRange().createContextualFragment(content).children;
    
    if (!dget(cont,'processed')) {
      each(content,function(child) { cont.appendChild(child); });
      return;
    }
    drem(cont,'done');
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
    dset(cont,'done','true');
    dset(cont,'count',cnt);
  }
  addEventListener('resize', colm);      
  addEventListener('load', colm);      
  return colm;
})();

