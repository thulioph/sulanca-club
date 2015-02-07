var APP = APP || {};
APP.Instagram = {
  setUp: function() {
    this.setConfig();
    this.handlebarsModal();
  },

  setConfig: function() {
    var that, limit, size, tag, url, accessToken;

    that        = this;
    limit       = 16;
    size        = 'medium';
    tag         = 'catrina';
    accessToken = '181941196.5b9e1e6.c4df4ed6d9494b9a817be3ee7d046127';
    url         = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + accessToken + '';

    that.getData(limit, size, url);
  },

  getData: function(limit, size, url) {
    var that = this;

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: url,
      beforeSend: function() {
        console.log('Carregando...');
      },

      success: function(data) {
        if (data.data.length === 0) {
          alert('Não existem imagens!');
        } else {
          that.template(data, limit, size);
        }
      },

      error: function(error) {
        console.warn(error);
      }
    });
  },

  template: function(data, limit, size) {
    var source, template, output, dados, photos;

    source = document.getElementById('instagram-template').innerHTML;
    template = Handlebars.compile(source);
    photos = [];

    for (var i = 0; i < limit; i++) {
      var href = data.data[i].link,
          imgUrl = data.data[i].images.thumbnail.url,
          likes = data.data[i].likes.count,
          text = data.data[i].caption.text;

      photos.push({
        href: href,
        imgUrl: imgUrl,
        likes: likes,
        text: text
      });

      output = template({photos:photos});
      document.getElementById('feeds-instagram').innerHTML = output;
    }
  }
}
