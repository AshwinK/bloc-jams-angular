(function() {
  function SongPlayer($rootScope, Fixtures) {
  var SongPlayer = {};
  var song = null;

  /**
  * @desc Gets the index of a song
  * @type {Object}
  */
  var currentAlbum = Fixtures.getAlbum();

  /**
   * @desc Buzz object audio file
   * @type {Object}
   */
  var currentBuzzObject = null;

  /**
   * @ong
   * @desc Stops currently playing song and loads new audio file as currentBuzzObject
   * @param {Object} song
   */
  var setSong = function(song) {

    if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }


    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });

    SongPlayer.currentSong = song;

  };

  /**
   * @function playSong
   * @desc Starts selected song
   * @param {Object} song
   */
  var playSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.play();
        SongPlayer.currentSong.playing = true;
    }
  };

  /**
   * @function getSongIndex
   * @desc Gets the index of the song
   * @param {Object} song
   */
  var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
  };

  SongPlayer.currentSong = null;

  /**
  * @desc Current playback time (in seconds) of currently playing song
  * @type {Number}
  */
  SongPlayer.currentTime = null;

  /**
  * @desc Current playback time (in seconds) of currently playing song
  * @type {Number}
  */
  SongPlayer.volume = null;

  SongPlayer.play = function(song) {
     song = song || SongPlayer.currentSong;
     if (SongPlayer.currentSong !== song) {
         setSong(song);
         playSong(song);
     } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
    }
 };

   SongPlayer.setVolume = function(volume){
     if (currentBuzzObject) {
       currentBuzzObject.setVolume(volume);
     }
   };

  SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;
     currentBuzzObject.pause();
     song.playing = false;
  };

  var songStop = function(song) {
     song = song || SongPlayer.currentSong;
     currentBuzzObject.stop();
     song.playing = null;
  };

  /**
   * @function previous
   * @desc Decrease the index of the currently playing song by one
   */
  SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
         songStop();
       } else {
           song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
  };

  /**
   * @function next
   * @desc Increase the index of the currently playing song by one
   */
  SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;

     if (currentSongIndex > currentAlbum.songs.length - 1) {
         songStop();
         setSong(null);
     } else {
         song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
  };

  /**
  * @function setCurrentTime
  * @desc Set current time (in seconds) of currently playing song
  * @param {Number} time
  */
  SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
          currentBuzzObject.setTime(time);
      }
  };

  return SongPlayer;
}

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
