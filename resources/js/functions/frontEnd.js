$(function () {
  if ($('#contact-form .ui.form').length) {
    $('#contact-form .ui.form').form({
      fields: {
        name: 'empty',
        email: ['empty', 'email'],
        tel: ['empty', 'number', 'minLength[8]'],
        subject: 'empty',
        message: 'empty',
      }
    });

    const resultData = $('.result-data');

    $('#contact-form .ui.form .digit-input').on('keyup', function(){
      let digited = $(this).val();
      let elem = $(this).attr('name');

      resultData.find(`.${elem}`).text(digited);
    });

    $('#contact-form .ui.form').on('submit', function(e){
      e.preventDefault();

      if( $('#contact-form .ui.form').form('is valid')) {
        let data = $(this).serializeArray();

        let formatData = {
          name: data[0].value,
          email: data[1].value,
          tel: data[2].value,
          subject: data[3].value,
          message: data[4].value,
        }

        sessionStorage.setItem('form-cadastro', JSON.stringify(formatData));

        if (sessionStorage.getItem('form-cadastro') !== null) {
          alert('Cadastrado com sucesso');

          $('#contact-form .ui.form button').text('Editar');
        }
      }
    });

    function loadDataSession() {
      let contactData = JSON.parse(sessionStorage.getItem('form-cadastro'));
      let keysData = Object.keys(contactData);

      keysData.forEach((field) => {
        $(`#contact-form .ui.form .digit-input[name="${field}"]`).val(contactData[field]);

        $(`.result-data .${field}`).text(contactData[field]);
      });

      $('#contact-form .ui.form button').text('Editar');
    }

    if (sessionStorage.getItem('form-cadastro') !== null) {
      loadDataSession();
    }
  }
});