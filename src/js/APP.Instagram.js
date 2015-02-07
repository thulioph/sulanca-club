var APP = APP || {};
APP.Instagram = {
  setUp: function() {
    this.setConfig();
  },

  setConfig: function() {
    var that, limit, size, user, url, clientId;

    that        = this;
    limit       = 14;
    user        = '1343762866';
    clientId    = 'd8620946db974380820e9264a4a4482d';
    url         = 'https://api.instagram.com/v1/users/'+ user +'/media/recent?client_id=' + clientId + '&access_token='+ '';

    that.getData(limit, url);
  },

  getData: function(limit, url) {
    var that = this;

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: url,
      beforeSend: function() {
        // console.log('Carregando...');
      },

      success: function(data) {
        if (data.data.length === 0) {
          alert('Não existem imagens!');
        } else {
          that.template(data, limit);
        }
      },

      error: function(error) {
        console.warn(error);
      }
    });
  },

  template: function(data, limit) {
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
