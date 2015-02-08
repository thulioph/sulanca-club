// ==========================================
// Send email if internet is ok.
// ==========================================

var APP = APP || {};
APP.Contact = {
  setUp: function(){
    this.submitForm();
  },

  submitForm: function() {
    var formdata, that, nome, email, mensagem;

    that = this;

    $('#contact-form').on('submit', function(event) {
      event.preventDefault();
      nome = $('#contact-name').val(),
      email = $('#contact-email').val(),
      mensagem = $('#contact-textarea').val();

      formdata = {
        nome: nome,
        email: email,
        mensagem: mensagem
      };

      that.checkStatus(email, formdata);
    });
  },

  checkStatus: function(email, formdata) {
    var that = this;

    if ($('body').hasClass('js-offline') == false) {
      that.sendForm(formdata);
    } else {
      APP.Storage.convertString(email, formdata);
    }
  },

  sendForm: function(formdata) {
    $.ajax({
      url: 'send.php',
      type: 'POST',
      data: formdata,

      beforeSend: function() {
        $('#feedback').fadeIn();
        $('#feedback').html('Enviando...');
      },

      success: function(data) {
        $('#contact-form')[0].reset();
        $('#feedback').fadeIn();
        $('#feedback').html(data);
      },

      error: function(error) {
        $('#feedback').addClass('js-error');
        $('#feedback').fadeIn();
        $('#feedback').html(error);
      }
    });
  }
}
