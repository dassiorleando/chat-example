/**
 * @author dassiorleando
 * The main script of the private chat app
 */
(function(window){
    // Initiate the socket conection
    var socket = io();
    // $("#send").disable();

    // Display the chat view
    $('.chat-start-here').click(function(){
        $('#chat-view').show();
    });

    // On form submited we emit a message
    $('form').submit(function () {
        var message = $('#message').val();
        if (message === "" || !message) {
            return false;
        }
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
        return false;
    });

    // On new message we just print
    socket.on('chat message', function (msg) {
        // We add the new message as a card
        $('#messages').append($('<div class="card card-body">').text(msg));
    });
})(window);