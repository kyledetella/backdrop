Backdrop
========

Video manager with image fallbacks

###Usage

####Dependencies
  - [`Modernizr.js`](http://modernizr.com/) – Used for video support detection `Modernizr.Video`
  
  - [`lodash.js`](http://lodash.com) – Used for utility methods and operations
 
####Setup
Assuming you already have a DOM structure ready (see [example](/example/index.html)), you can instantiate Backdrop via:

```js
 var backdrop = new Backdrop();
```

You should pass in your video types and image fallbacks as such:

```js
 var backdrop = new Backdrop({
  
  // DOM element to render video/image into
  stage: document.getElementById('my_stage'),
  
  // Your media sources (video & img)
  src: {
   video: {
    ogg: 'path/to/video.ogg',
    webm: 'path/to/video.webm',
    mp4: 'path/to/video.mp4',
   },
   image: '/path/to/image'
  }
  
 });

```

---

###TODO
 + Add fallback to image if video is not passed in or returns an error
 + Write a rock-solid feature support method for image fallbacks on non-autoplay devices)
 + Add play/pause support (low priority)
 + Add playlist support
