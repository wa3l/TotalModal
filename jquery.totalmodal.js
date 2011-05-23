/*! Copyright (c) 2011 Wael Al-Sallami (http://wa3l.com)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 * Version: 0.1
 * Requires jQuery 1.3+
 */
(function($){
  $.modal = function(params){
    // is there any other modal displayed now?
    if($('#modal-overlay').length) { 
      return false;
    }
    // unbind events to clear previous modals bindings:
    $(window).unbind('click keypress', $.modal.hide());
    
    var modal = $.modal.build_markup(params);
    $.modal.show(modal);
    // bind the buttons callback functions with each one's click event:
    $.modal.bind_events(params);
  }

  $.modal.bind_events = function(params) {
    // modal has buttons?
    if (params.buttons) {
      $.modal.bind_buttons_events(params);
    } else {
      // No, setup auto-hide and click event:
      $.modal.bind_hide_events(params);
    }
  }

  $.modal.bind_buttons_events = function(params) {
    var buttons = $('.modal .button');
    var i       = 0;
    $.each(params.buttons, function(name, obj)
    {
      buttons.eq(i++).click(function()
      {
        obj.action();
        $.modal.hide();
        return false;
      });
    });
  }

  $.modal.bind_hide_events = function(params) {
    // bind hiding to click and keypress events:
    setTimeout(function(){
      $(window).bind('click keypress', function(){
        $.modal.hide();
      })
    }, 2000)
    // hide it if no keypress or click events are
    // triggered before the timeout:
    var time = params.min_time + params.char_time * Math.sqrt(params.message.length);
    setTimeout("$.modal.hide()", time);
  }

  $.modal.build_markup = function (params) {
    var markup = [
      '<div id="modal-overlay">',
      '<div class="modal">',
      '<p>',params.message,'</p>'
    ];
    // did we supply any buttons?
    if (params.buttons) {
      
      // open the buttons div:
      markup.push('<div class="buttons">');
      
      // create the buttons:
      $.each(params.buttons, function(name,obj) {
        markup.push('<a href="#" class="button '+obj['class']+'">'+name+'<span></span></a>');
        if (!obj.action) {
          obj.action = function(){};
        }
      });
      
      // close the buttons div:
      markup.push('</div>');
    } else {
      markup.push('<span>Click anywhere to hide this message.</span>');
    }
    // close the modal the overlay:
    markup.push('</div></div>');
    return markup;
  }

  $.modal.show = function(markup){
    markup = markup.join('');
    $(markup).hide().appendTo('body').fadeIn();
  }

  // hide the modal box
  $.modal.hide = function(){
    var visible   = $('#modal-overlay').is(':visible');
    var animated  = $('#modal-overlay').is(':animated');
    if (visible && !animated)
    {
      $('#modal-overlay').fadeOut(function(){
        $(this).remove();
      });
    }
  }
})(jQuery);