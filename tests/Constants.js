// Wrap it in a function to not pollute the global namespace
(function(){

  var TestConstants = function() {
    this.URL_SERVER = 'http://192.168.1.4:8080/rest/'; //The url SHOULD end with a "/" (because the service suposes it does)
    this.EVENT_ID = 41;
    this.SONG_ID = 58;
    this.DRAW_ID = 39
  };

  // get the instance you want to export
  var constants = new TestConstants();

  // if module.export is available ( NodeJS? ) go for it,
  // otherwise append it to the global object
  if (module && module.exports) {
    module.exports = constants;
  } else {
    window.constants = constants;
  }

})();
