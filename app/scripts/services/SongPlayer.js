(function() {
  function SongPlayer() {
  var SongPlayer = {};

  /**
   * @desc Buzz object audio file
   * @type {Object}
   */
  var currentBuzzObject = null;

  /**
   * @function setSong
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

    SongPlayer.currentSong = song;

  };

  SongPlayer.currentSong = null;

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

  SongPlayer.play = function(song) {
      if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
      } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
       }
  };

  SongPlayer.pause = function(song) {
     currentBuzzObject.pause();
     song.playing = false;
  };

  return SongPlayer;
}

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
