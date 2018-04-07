/**
 * @author dassiorleando
 * The main script of the private chat app
 */
(function(window){
    // Initiate the socket conection
    var socket = io();
    var name = localStorage.getItem('name');
    // $("#send").disable();
    $('#name-view').hide();

    // Display the chat view
    $('.chat-start-here').click(function(){
        if(name) return $('#chat-view').show();
        $('#name-view').show();
    });

    $('.form-name').click(function(){
        name = $('#name').val();
        if (!name) return false;
        localStorage.setItem('name', name);

        $('#name-view').hide();
        $('#chat-view').show();
    });

    setInterval(function(){ $("#messages").html('<div></div>'); }, 50000);

    // On form submited we emit a message
    $('.form-message').click(function () {
        var message = $('#message').val();
        if (message === "" || !message) {
            return false;
        }
        var messageData = {
            name: name,
            message: message
        }
        socket.emit('chat message', messageData);
        $('#message').val('');
        return false;
    });

    // On new message we just print
    socket.on('chat message', function (messageData) {
        // We add the new message as a card
        // Use also the sender name
        $('#messages').append($('<div class="card card-body">').html(messageData.name + ': &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + messageData.message));
    });
})(window);