$('#btn-submit').click(function() {
    $('#contactForm').submit();
});

$("#contactForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        formError();
        submitMSG(false, "Compilare in modo corretto tutti i campi.");
    } else {
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    var jsonBody = {
        body: {
            email: $('#email').val(),
            message: $('#message').val(),
            name: $('#name').val()
        },
        timestamp: parseInt($.now() / 1000),
        uri: (document.location.hostname) ? document.location.hostname : 'localhost'
    };

    $.ajax({
        type: 'POST',
        url: 'https://api.bitapp.it/contact',
        data: JSON.stringify(jsonBody),
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            if (jqXHR.status == 201) {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Grazie per averci contattato!")
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#success").removeClass().addClass(msgClasses).text(msg);
    $("#success").fadeIn();
    setTimeout(function() {
        $("#success").fadeOut();
    }, 2000);
}