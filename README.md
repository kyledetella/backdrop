Kino
====

Video manager with image fallbacks

###Usage

####Dependencies
Game Grid carries two hard dependencies: 
  - [`Modernizr.js`](http://modernizr.com/) – Used for video support detection `Modernizr.Video`
  
  - [`lodash.js`](http://lodash.com) – Used for utility methods and operations
 
####Setup
Assuming you already have a DOM structure ready (see [example](/example/index.html)), you can instantiate Kino via:

```js
 var kino = new Kino();
```

You should pass in your video types and image fallbacks as such:

```js
 var kino = new Kino({
  
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
