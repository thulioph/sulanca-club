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
      infinite: true,
      speed: 500,
      fade: true,
      slide: 'figure',
      cssEase: 'ease-out'
    });
  }
};
