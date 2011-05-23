TotalModal
=======
An easy to use jQuery plugin to handle notification boxes and confirmation boxes (i.e. with buttons), it let's you easily ceate notification boxes that disappear after a timeout or upon a click event, or you can add buttons and have actions associated with clicking them.

Disclaimer: This is based on a plugin called jquery.confirm and some other code, I only improved and added features to the original plugin.

Usage
-----
To use TotalModal, you first have to include jQuery, TotalModal JS file, and the associated CSS document:  

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
    <script src="jquery.totalmodal.js" type="text/javascript"></script>
    <link rel="stylesheet" href="jquery.totalmodal.css" type="text/css" media="screen">
  
#### To create a Confirmation box with one button or more: ####
    $.modal({
      'message': "This is a Confirmation box!",
      'buttons': {
        'OK': {
          'class' : 'blue',
          'action': function(){
            // custom action to be executed upon clicking this button
            alert('Clicked OK');
          }
        },
        'Cancel': {
          'class' : 'gray',
          'action': function(){
            // custom action to be executed upon clicking this button
            alert('Clicked Cancel');
          }
        }
      }
    });
  
You can include even more buttons by adding another block under 'buttons' with the proper attributes.  

#### To create a Notification box with no buttons: ####
    $.modal({
      'message': "This is a Notification box! Click anywhere to hide it or wait for the timeout!",
      'min_time': 5000,
      'char_time': 75
    });
  
By default, the user has to click anywhere on the page or press any key to hide a notification box, but by defining the **min\_time** and the **char\_time** attributes, you can set a timeout for the notification box to hide it even when the user does nothing.  
  
To force the user to click or press a key in order to hide the modal, just leave out the **min\_time** and the **char\_time** attributes like so:

    $.modal({'message': "This is a Notification box!"});
  
**Please note that _min\_time_ and _char\_time_ should only be defined for Notification boxes, they won't work for Confirmation ones**
  
License
-----
Public domain: [http://unlicense.org](http://unlicense.org)