/*
 *  jQuery Tekitizy Carousel v1.0.0
 *
 *  Copyright (c) 2016 David Maarek - Mathieu Rodrigues
 *  http://
 *
 *  Licensed under DM.MR.2016.12
 *
 *  Search '@' to find function prototype easily
 *
 */

// Get parameters if exists
function Tekitizy (selector, options) {
  this.selector = selector

  if (options && options.hasOwnProperty('carousel_id')) {
    this.carousel_id = options.carousel_id
  } else if (!options) {
    this.carousel_id = 'tekitizy_carousel'
    this.prevNext = 'true'
    this.play = 'true'
    this.autoPlay = 'true'
    this.imageDuration = 2000
    this.effect = 'true'
    this.thumbnails = 'true'
  } else {
    this.carousel_id = 'tekitizy_carousel'
    this.prevNext = options.prevNext || 'true'
    this.play = options.play || 'true'
    this.autoPlay = options.autoPlay || 'true'
    this.imageDuration = options.imageDuration * 1000 || 2000
    this.effect = options.effect || 'true'
    this.thumbnails = options.thumbnails || 'true'
  }
}

// @ Init function
Tekitizy.setup = function ($, imgSelector, opts) {
  $(document).ready(function () {
    var tekitizy
    tekitizy = new Tekitizy(imgSelector, opts)
    tekitizy.setup()
  })
}

// @ After init new Carousel, run multiple methods
Tekitizy.prototype.setup = function () {
  this.drawcarousel(this.carousel_id)
  this.appendZoomBtn(this.selector, this.clickZoomBtn)
  this.listenToButtons()
  this.playInterval()
}

// @ Listeners
Tekitizy.prototype.listenToButtons = function () {
  var _this = this

  $('.tekitizy-open-btn').on('click', function () {
    _this.actionShow($(this).attr('data-src'), $(this).attr('data-alt'), $(this).attr('data-index'))
    _this.showThumbnails()
    _this.selectThumbnails()
    _this.initThumb($(this).attr('data-index'))
  })

  $('.tekitizy-close-btn').on('click', function () {
    _this.actionClose()
    _this.actionPause()
  })

  $('.tekitizy-prev-btn').on('click', function () {
    var $$this
    $$this = $(this)

    if (!$(this).hasClass('move-action')) {
      $(this).addClass('move-action')
      _this.actionPrev()
      setTimeout(function () {
        $$this.removeClass('move-action')
      }, 400)
    }
  })

  $('.tekitizy-next-btn').on('click', function (e) {
    var $$this
    $$this = $(this)

    if (!$(this).hasClass('move-action')) {
      $(this).addClass('move-action')
      _this.actionNext()
      setTimeout(function () {
        $$this.removeClass('move-action')
      }, 400)
    }
  })

  $('.tekitizy-control-btn').on('click', function () {
    if ($('.tekitizy-control-btn').hasClass('tekitizy-play-btn')) {
      _this.actionPlay()
    } else if ($('.tekitizy-control-btn').hasClass('tekitizy-pause-btn')) {
      _this.actionPause()
    }
  })

  $(window).on('resize', function () {
    _this.boxContainerWidth()
  })
}

// @ Create the structure of the Tekitizy Carousel
Tekitizy.prototype.drawcarousel = function (id) {
  var carousel = ''

  carousel += '<div class="tekitizy-carousel" id=' + id + '>'
  carousel += '<i class="fa fa-close tekitizy-close-btn"></i>'

  if (this.prevNext === 'true' || this.play === 'true' || this.autoPlay === 'true') {
    carousel += '<ul class="tekitizy-controls">'

    if (this.prevNext === 'true') {
      carousel += '<a class="fa fa-chevron-left tekitizy-prev-btn"></a>'
    }

    if (this.play === 'true' || this.autoPlay === 'true') {
      if (this.play === 'true') {
        carousel += '<a class="tekitizy-control-btn fa fa-play tekitizy-play-btn"></a>'
      } else {
        carousel += '<a class="tekitizy-control-btn fa"></a>'
      }
    }

    if (this.prevNext === 'true') {
      carousel += '<a class="fa fa-chevron-right tekitizy-next-btn"></a>'
    }

    carousel += '</ul>'
  }

  if (this.thumbnails === 'true') {
    carousel += '<ul class="tekitizy-navigation-thumbs"></ul>'
  }

  if (this.effect === 'true') {
    carousel += '<div class="tekitizy-box-container">'
    carousel += '<ul class="tekitizy-image-container"></ul>'
    carousel += '</div>'
  } else {
    carousel += '<ul class="tekitizy-image-container no-effect"></ul>'
  }

  carousel += '</div>'

  this.carousel = $(carousel)
  this.carousel.appendTo($('body'))
}

// @ Calcule Width of Box Container
Tekitizy.prototype.boxContainerWidth = function () {
  var box_container_width
  box_container_width = $(window).width() / 2

  $('.tekitizy-image-content').each(function () {
    $(this).width(box_container_width)
  })
}

// @ Add the glass icon (search-icon) on each image
Tekitizy.prototype.appendZoomBtn = function (selector) {
  $(selector).each(function (index) {
    var element, image_src, image_alt, image_index
    element = $(this)
    image_src = element.attr('src')
    image_alt = element.attr('alt')
    image_index = index
    element.wrap('<div></div>')
      .parent()
        .addClass('tekitizy-container')
        .append('<i class="tekitizy-open-btn fa fa-search" data-src="' + image_src + '" data-alt="' + image_alt + '" data-index="' + image_index + '" aria-hidden="true"></i>')
  })
}

// @ Display selected image and create Carousel
Tekitizy.prototype.actionShow = function (url, alt, image_index) {
  $('.tekitizy-container').each(function (index) {
    var each_tekitizy_image, each_tekitizy_image_alt

    each_tekitizy_image = $(this).children('img').attr('src')
    each_tekitizy_image_alt = $(this).children('img').attr('alt')

    if (index.toString() === image_index) {
      $('.tekitizy-image-container').append('<li class="tekitizy-image-content tekitizy-image-active" data-index="' + index + '"><img src="' + each_tekitizy_image + '"><div class="tekitizy-image-alt">' + each_tekitizy_image_alt +'</div></li>')
    } else {
      $('.tekitizy-image-container').append('<li class="tekitizy-image-content" data-index="' + index + '"><img src="' + each_tekitizy_image + '"><div class="tekitizy-image-alt">' + each_tekitizy_image_alt +'</div></li>')
    }

    Tekitizy.prototype.indexSlideMax = index.toString()
  })

  this.boxContainerWidth()
  this.carousel.addClass('tekitizy-carousel-open')
}

// @ Go to the previous image
Tekitizy.prototype.actionPrev = function () {
  var tekitizy_img_current, tekitizy_img_prev, tekitizy_width_container, flag_effect

  tekitizy_img_current = $('.tekitizy-image-active')
  tekitizy_img_prev = tekitizy_img_current.prev()
  tekitizy_width_container = $('.tekitizy-image-content').width()

  if (this.effect === 'true') {
    flag_effect = true
  }

  if (tekitizy_img_current.attr('data-index') === '0') {
    $('.tekitizy-image-container').find('.tekitizy-image-content').last().addClass('tekitizy-image-active prev')
    if (flag_effect) {
      $('.tekitizy-image-content').animate({
        left: '-=' + tekitizy_width_container * Tekitizy.prototype.indexSlideMax
      })
    }
  } else {
    tekitizy_img_prev.addClass('tekitizy-image-active')
    if (flag_effect) {
      $('.tekitizy-image-content').animate({
        left: '+=' + tekitizy_width_container
      })
    }
  }

  tekitizy_img_current.removeClass('tekitizy-image-active')
  $('.tekitizy-prev-btn, .tekitizy-next-btn').removeClass('move-active')

  if (this.thumbnails === 'true') {
    this.thumbPrev()
  }
}

// @ Go to the next image
Tekitizy.prototype.actionNext = function () {
  var tekitizy_img_current, tekitizy_img_next, tekitizy_width_container, flag_effect

  tekitizy_img_current = $('.tekitizy-image-active')
  tekitizy_img_next = tekitizy_img_current.next()
  tekitizy_width_container = $('.tekitizy-image-content').width()

  if (this.effect === 'true') {
    flag_effect = true
  }

  tekitizy_img_next.addClass('tekitizy-image-active')

  if (tekitizy_img_current.attr('data-index') === Tekitizy.prototype.indexSlideMax) {
    $('.tekitizy-image-container').find('.tekitizy-image-content').first().addClass('tekitizy-image-active')
    if (flag_effect) {
      $('.tekitizy-image-content').animate({
        left: '+=' + tekitizy_width_container * Tekitizy.prototype.indexSlideMax
      })
    }
  } else {
    tekitizy_img_next.addClass('tekitizy-image-active')
    if (flag_effect) {
      $('.tekitizy-image-content').animate({
        left: '-=' + tekitizy_width_container
      })
    }
  }

  tekitizy_img_current.removeClass('tekitizy-image-active')

  if (this.thumbnails === 'true') {
    this.thumbNext()
  }
}

// @ Go to the prev thumb
Tekitizy.prototype.thumbPrev = function () {
  var tekitizy_thumb_current, tekitizy_thumb_prev

  tekitizy_thumb_current = $('.tekitizy-thumb-active')
  tekitizy_thumb_prev = tekitizy_thumb_current.prev()

  if (tekitizy_thumb_current.attr('data-index') === '0') {
    $('.tekitizy-navigation-thumbs').find('.tekitizy-thumb-content').last().addClass('tekitizy-thumb-active')
  } else {
    tekitizy_thumb_prev.addClass('tekitizy-thumb-active')
  }

  tekitizy_thumb_current.removeClass('tekitizy-thumb-active')
}

// @ Go to the next thumb
Tekitizy.prototype.thumbNext = function () {
  var tekitizy_thumb_current, tekitizy_thumb_next

  tekitizy_thumb_current = $('.tekitizy-thumb-active')
  tekitizy_thumb_next = tekitizy_thumb_current.next()

  tekitizy_thumb_next.addClass('tekitizy-thumb-active')

  if (tekitizy_thumb_current.attr('data-index') === Tekitizy.prototype.indexSlideMax) {
    $('.tekitizy-navigation-thumbs').find('.tekitizy-thumb-content').first().addClass('tekitizy-thumb-active')
  } else {
    tekitizy_thumb_next.addClass('tekitizy-thumb-active')
  }

  tekitizy_thumb_current.removeClass('tekitizy-thumb-active')
}

// @ Change current image displayed every x seconds to the next
Tekitizy.prototype.playInterval = function () {
  var _this
  _this = this

  if (_this.autoPlay === 'true') {
    $('.tekitizy-control-btn').addClass('tekitizy-pause-btn').addClass('fa-pause')
  }

  setInterval(function () {
    if (Tekitizy.prototype.indexSlideMax) {
      if (_this.autoPlay === 'true') {
        _this.actionNext()
      }
    }
  }, _this.imageDuration)
}

// @ Run Autoplay on diaporama
Tekitizy.prototype.actionPlay = function () {
  var _this
  _this = this

  _this.autoPlay = 'true'
  $('.tekitizy-control-btn').addClass('tekitizy-pause-btn').addClass('fa-pause').removeClass('tekitizy-play-btn').removeClass('fa-play')
}

// @ Pause the diaporama
Tekitizy.prototype.actionPause = function () {
  var _this
  _this = this

  _this.autoPlay = 'false'
  $('.tekitizy-control-btn').addClass('tekitizy-play-btn').addClass('fa-play').removeClass('tekitizy-pause-btn').removeClass('fa-pause')
}

// @ Get img, data-index and create Thumbs Carousel
Tekitizy.prototype.showThumbnails = function () {
  $('.tekitizy-image-content').each(function () {
    var each_tekitizy_image, each_tekitizy_content_index

    each_tekitizy_image = $(this).children('img').attr('src')
    each_tekitizy_content_index = $(this).attr('data-index')

    $('.tekitizy-navigation-thumbs').append('<li class="tekitizy-thumb-content" data-index="' + each_tekitizy_content_index + '"><img src="' + each_tekitizy_image + '"></li>')
  })
}

// @ Select the thumbnail to selecte at init
Tekitizy.prototype.initThumb = function (image_index) {
  $('.tekitizy-navigation-thumbs').children().each(function () {
    if ($(this).attr('data-index') === image_index) {
      $(this).addClass('tekitizy-thumb-active')
    } else {
      $(this).removeClass('tekitizy-thumb-active')
    }
  })
}

// @ Click to select Thumbnail for show Image bigger
Tekitizy.prototype.selectThumbnails = function () {
  var selected_thumb_index, selected_thumb_index_current, _this, tekitizy_width_container

  _this = this

  $('.tekitizy-thumb-content').on('click', function () {
    tekitizy_width_container = $('.tekitizy-image-content').width()
    selected_thumb_index_current = $('.tekitizy-thumb-active').attr('data-index')

    $('.tekitizy-thumb-content').removeClass('tekitizy-thumb-active')
    $(this).addClass('tekitizy-thumb-active')

    selected_thumb_index = $(this).attr('data-index')

    if (_this.effect === 'true') {
      $('.tekitizy-image-container').children().each(function () {
        if ($(this).attr('data-index') === selected_thumb_index) {
          $(this).addClass('tekitizy-image-active')

          if (selected_thumb_index > selected_thumb_index_current) {
            if (selected_thumb_index === 0) {
              $('.tekitizy-image-content').animate({
                left: '0'
              })
            } else {
              $('.tekitizy-image-content').animate({
                left: '-=' + tekitizy_width_container * (selected_thumb_index - selected_thumb_index_current)
              })
            }
          } else if (selected_thumb_index < selected_thumb_index_current) {
            if (selected_thumb_index === 0) {
              $('.tekitizy-image-content').animate({
                left: '0'
              })
            } else {
              $('.tekitizy-image-content').animate({
                left: '+=' + tekitizy_width_container * (selected_thumb_index_current - selected_thumb_index)
              })
            }
          }
        } else {
          $(this).removeClass('tekitizy-image-active')
        }
      })
    } else {
      $('.tekitizy-image-container').children().each(function () {
        if ($(this).attr('data-index') === selected_thumb_index) {
          $(this).addClass('tekitizy-image-active')
        } else {
          $(this).removeClass('tekitizy-image-active')
        }
      })
    }
  })
}

// @ Close and destroy Carousel and Thumbs
Tekitizy.prototype.actionClose = function () {
  this.carousel.removeClass('tekitizy-carousel-open')
  this.carousel.find($('.tekitizy-image-container, .tekitizy-navigation-thumbs')).empty()
}
