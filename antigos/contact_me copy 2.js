$(function () {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // Erros de validação aparecem automaticamente
    },
    submitSuccess: function ($form, event) {
      event.preventDefault() // Impede o envio tradicional

      // Captura os valores do formulário
      var name = $("input#name").val()
      var email = $("input#email").val()
      var message = $("textarea#message").val()
      var firstName = name.split(" ")[0]

      // Envia via AJAX para o FormSubmit
      $.ajax({
        url: "https://formsubmit.co/ajax/feedback.clientes@bonnacafe.com.br",
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
          // Mensagem de sucesso
          $("#success").html("<div class='alert alert-success'>")
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append("<strong>Sua mensagem foi enviada com sucesso!</strong>")
            .append("</div>")
          $("#contactForm").trigger("reset")
        },
        error: function () {
          // Mensagem de erro
          $("#success").html("<div class='alert alert-danger'>")
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append(
              `<strong>Desculpe, ${firstName}. Houve um erro no envio. Tente novamente mais tarde.</strong>`
            )
            .append("</div>")
          $("#contactForm").trigger("reset")
        },
      })
    },
    filter: function () {
      return $(this).is(":visible")
    },
  })

  $("a[data-toggle='tab']").click(function (e) {
    e.preventDefault()
    $(this).tab("show")
  })
})

// Limpa mensagens quando o usuário começa a digitar
$("#name").focus(function () {
  $("#success").html("")
})
