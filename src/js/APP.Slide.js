// ==========================================
// Lib that active slide.
// ==========================================

var APP  = APP || {};
APP.Slide = {
  setUp: function() {
    this.initSlide();
  },

  initSlide: function() {
    $('#slide').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 500,
      fade: true,
      slide: 'a',
      cssEase: 'ease-out'
    });
  }
};
