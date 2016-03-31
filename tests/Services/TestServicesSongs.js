describe('TestServicesSongs', function() {

  var SongsFactory;
  var $httpBackend;

  beforeEach(angular.mock.http.init);

  beforeEach(function() {
    module('amc.servicesSongs', function($provide) {
      $provide.constant('URL_WEB_SERVICE', constants.URL_SERVER);
    });
  });

  beforeEach(inject(function($injector, _SongsFactory_, _$httpBackend_, URL_WEB_SERVICE){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    SongsFactory= _SongsFactory_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(angular.mock.http.reset);

  describe('Test Songs services', function() {

    it('Retrieve all the songs (6)', function(done) {
      $httpBackend.whenGET(constants.URL_SERVER+'amc-musiques/all').passThrough();
      setTimeout(function() {
        SongsFactory.getSongs().then(function(data) {
          expect(data.length).toEqual(6);
          expect(data[0].auteur).toEqual("Auteur1");
          expect(data[1].auteur).toEqual("Auteur2");
          expect(data[2].auteur).toEqual("Auteur3");
          expect(data[3].auteur).toEqual("Auteur4");
          expect(data[4].auteur).toEqual("Auteur5");
          expect(data[5].auteur).toEqual("Auteur6");
          done();
        });
      }, 1000);
    });

    var idElem = constants.SONG_ID;
    it('Retrieve one song (with id '+idElem+')', function(done) {
      $httpBackend.whenGET(constants.URL_SERVER+'amc-musiques/id/'+idElem).passThrough();
      setTimeout(function() {
        SongsFactory.getSong(idElem).then(function(data) {
          expect(data.auteur).toEqual("Auteur1");
          expect(data.titre).toEqual("Musique1 Test");
          done();
        });
      }, 1000);
    });
  });
});
