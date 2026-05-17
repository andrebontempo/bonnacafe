$(function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault() // impede envio normal

    var name = $("#name").val()
    var email = $("#email").val()
    var message = $("#message").val()
    var firstName = name.split(" ")[0]

    $.ajax({
      url: "https://formsubmit.co/ajax/administrador@bonnacafe.com.br",
      method: "POST",
      dataType: "json",
      accepts: "application/json",
      data: {
        name: name,
        email: email,
        message: message,
        _subject: "Contato via site Bonna Café",
      },
      success: function () {
        $("#success").html("<div class='alert alert-success'>")
        $("#success > .alert-success")
          .html(
            "<button type='button' class='close' data-dismiss='alert'>&times;</button>"
          )
          .append("<strong>Sua mensagem foi enviada com sucesso!</strong>")
          .append("</div>")
        $("#contactForm").trigger("reset")
      },
      error: function () {
        $("#success").html("<div class='alert alert-danger'>")
        $("#success > .alert-danger")
          .html(
            "<button type='button' class='close' data-dismiss='alert'>&times;</button>"
          )
          .append(
            `<strong>Desculpe ${firstName}, houve um erro no envio. Tente novamente mais tarde.</strong>`
          )
          .append("</div>")
        $("#contactForm").trigger("reset")
      },
    })
  })

  // Limpa mensagens ao focar no nome
  $("#name").focus(function () {
    $("#success").html("")
  })
})
