/* globals define: true, Modernizr: true , _: true*/
/**
 * Backdrop.js – https://github.com/kyledetella/backdrop
 * v0.0.1
 *
 * Dependencies
 *   – Modernizr.js
 *   - lodash.js
 * 
 */
(function (w) {

  'use strict';

  var hasAutoPlay = !navigator.userAgent.match('Android|iOS'),
      Backdrop;

  Backdrop = function (opts) {
    
    var config,

        // Elements
        videoElement,

        // Methods
        getVideoSource,
        writeImage,
        writeVideo,
        resizeVideo,
        renderStage,
        initialize;

    /**
     * Merge passed in configuration options with defaults
     */
    config = _.extend({
      stage: document.getElementById('backdrop'),
      src: {
        video: {
          ogg: '/path/to/video.ogg',
          webm: '/path/to/video.webm',
          mp4: 'path/to/video.mp4'
        },
        image: '/path/to/image'
      }
    }, opts);

    /**
     * Utility method to return proper video type
     * @return {String} Path to video
     *
     * TODO: This method needs to be much more bulletproof
     */
    getVideoSource = function () {
      var mv = Modernizr.video,
          src;

      if (mv.ogg) src = config.src.video.ogg;
      if (mv.webm) src = config.src.video.webm;
      if (mv.h264) src = config.src.video.mp4;

      return src;
    };

    /**
     * Write background image when autoplay is unavailable
     * 
     */
    writeImage = function () {
      var img = config.src.image,
          el = config.stage;

      el.style.backgroundImage = 'url(' + img + ')';
      el.style.height = '100%';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center center';

      renderStage();
    };

    writeVideo = function () {
      // This is the video
      var videoSrc = getVideoSource(),
          videoReady;
      
      //
      // Create a <video> tag – set its reference on this class
      // 
      videoElement = document.createElement('video');

      // 
      // Set attributes on the video element
      // 
      videoElement.setAttribute('autoplay', 1);
      videoElement.setAttribute('loop', 1);
      videoElement.setAttribute('src', videoSrc);

      //
      // Handle when video reports as ready
      // 
      videoReady = function () {
        //
        // Listen for window resize to fire off a video update
        // 
        w.addEventListener('resize', _.debounce(resizeVideo, 10));

        //
        // Manually resize video
        // 
        resizeVideo(renderStage);

        this.removeEventListener('loadedmetadata', videoReady);
      };

      //
      // Listen for video element to be ready
      // 
      videoElement.addEventListener('loadedmetadata', videoReady);

      //
      // Write video to DOM
      // 
      config.stage.appendChild(videoElement);
    };

    /**
     * Resize video to maintain aspect ratio
     * @param  {Function} cb Optional callback (else default DOM event will be written here)
     * 
     */
    resizeVideo = function (cb) {
      if (!videoElement) return;

      var ww = w.innerWidth,
          wh = w.innerHeight,
          vidW = 1280,
          vidH = 720,
          scaleW = ww / vidW,
          scaleH = wh / vidH,
          scale = scaleH > scaleW ? scaleH : scaleW,
          newWidth, newHeight;

      if (scale * vidW < 320) scale = (320 / vidW);

      newWidth = (scale * vidW);
      newHeight = (scale * vidH);

      videoElement.style.width = newWidth + 'px';
      videoElement.style.height = newHeight + 'px';

      config.stage.style.left = -((newWidth - ww) / 2) + 'px';
      config.stage.style.top = -((newHeight - wh) / 2) + 'px';

      if (_.isFunction(cb)) cb();
    };

    /**
     * Render-in the container of our media
     * 
     */
    renderStage = function () {
      config.stage.style.opacity = 1;
    };

    /**
     * Initialize the utilty
     */
    initialize = function () {
      if (!Modernizr.video || !hasAutoPlay) {
        writeImage();
      } else {
        writeVideo();
      }
    };

    initialize();
  };


  /**
   * Transport
   */
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return Backdrop;
    });
  } else {
    w.Backdrop = Backdrop;
  }

})(window);