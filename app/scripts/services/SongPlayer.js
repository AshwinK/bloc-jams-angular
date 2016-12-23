(function() {
  function SongPlayer(Fixtures) {
  var SongPlayer = {};


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
           var song = currentAlbum.songs[currentSongIndex];
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
       } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
  };

  return SongPlayer;
}

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
