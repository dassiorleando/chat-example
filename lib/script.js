/**
 * @author dassiorleando
 * The main script of the private chat app
 */
(function(window){
    // Initiate the socket conection
    var socket = io();
    // $("#send").disable();

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

    // On new message print them
    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });
})(window);