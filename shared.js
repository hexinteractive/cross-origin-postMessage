
$(document).ready(function() {

  var targetOrigin, targetWindow, tag;

  if($('body.pageA')) {

    targetOrigin = 'http://hexinteractive.net';
    tag = '<iframe src="' + targetOrigin + '/cross-origin-postmessage/other.html' + '"></iframe>';
    $('#iframeHolder').html(tag);
    targetWindow = $('iframe')[0].contentWindow;

  } else if($('body.pageB')) {

    targetOrigin = 'http://hexinteractive.github.io';
    targetWindow = window.parent;

  }

  // :: :: shared code :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: :: ::

  $('h2').text('on ' + window.location.origin);

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

  window.addEventListener("message", receiveMessage, false);

  $('form').on('submit',function(e){
    targetWindow.postMessage($('#tx').val(), targetOrigin);
    e.preventDefault();
    return false;
  });

});
