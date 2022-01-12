function execute_slider() {
    var splide = new Splide( '.splide', {
        type    : 'loop',
        perPage : 3,
        autoplay: true,
        perMove: 1,
        gap: 10,
      } );
      
      splide.mount();
}