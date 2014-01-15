
$(document).ready(function() {

  var targetOrigin, targetWindow, tag, loc;

  if(!window.postMessage) {
    alert('Your browser does NOT support window.postMessage. Try a different browser.');
  }

  if($('body').hasClass('pageA')) {

    targetOrigin = 'http://hexinteractive.net';
    tag = '<iframe src="' + targetOrigin + '/cross-origin-postmessage/other.html' + '"></iframe>';
    $('#iframeHolder').html(tag);
    targetWindow = $('iframe')[0].contentWindow;

  } else if($('body').hasClass('pageB')) {

    targetOrigin = 'http://hexinteractive.github.io';
    targetWindow = window.parent;

  }

  // :: :: shared code :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: ::

  // location.origin seems to be new.
  // fallback to location.protocol + location.host
  loc = (window.location.origin || window.location.protocol + window.location.host);
  $('h2').text('on ' + loc);

  function receiveMessage(event)
  {
    if (event.origin !== targetOrigin) {
      return;
    }

    if(typeof event.data === 'string' && event.data.indexOf('&#x21A9;') !== 0) {
      event.source.postMessage("&#x21A9; got it", event.origin);
      $('#rx').append('<p>'+ event.data +'</p>').scrollTop(999999);
    } else {
      $('#rx').append('<p class="reply">'+ event.data +'</p>').scrollTop(999999);
    }
  }

  if (window.addEventListener) {
      window.addEventListener("message", receiveMessage, false);
  } else if (window.attachEvent) {
      window.attachEvent("message", receiveMessage);
  }

  $('form').on('submit',function(e){
    targetWindow.postMessage($('#tx').val(), targetOrigin);
    e.preventDefault();
    return false;
  });

});
