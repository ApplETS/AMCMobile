describe('TestServicesDraws', function() {

  var DrawsFactory;
  var $httpBackend;

  beforeEach(angular.mock.http.init);

  beforeEach(function() {
    module('amc.servicesDraws', function($provide) {
      $provide.constant('URL_WEB_SERVICE', constants.URL_SERVER);
    });
  });

  beforeEach(inject(function($injector, _DrawsFactory_, _$httpBackend_, URL_WEB_SERVICE){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    DrawsFactory= _DrawsFactory_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(angular.mock.http.reset);

  describe('Test Draws services', function() {

    it('Retrieve all the draws (3)', function(done) {
      $httpBackend.whenGET(constants.URL_SERVER+'amc-tiragesorts/all').passThrough();
      setTimeout(function() {
        DrawsFactory.getDraws().then(function(data) {
          expect(data.length).toEqual(3);
          expect(data[0].description).toEqual("Un super prix1");
          expect(data[1].description).toEqual("Un super prix2");
          expect(data[2].description).toEqual("Un super prix3");
          done();
        });
      }, 1000);
    });

    var idElem = constants.DRAW_ID;
    it('Retrieve one draw (with id '+idElem+')', function(done) {
      $httpBackend.whenGET(constants.URL_SERVER+'amc-tiragesorts/id/'+idElem).passThrough();
      setTimeout(function() {
        DrawsFactory.getDraw(idElem).then(function(data) {
          expect(data.dateDebut).toEqual("2016-02-20T21:00:00-05:00");
          expect(data.description).toEqual("Un super prix1");
          expect(data.titre).toEqual("A Gagner1");

          //There is no order, so sometimes it's the first elem, sometimes the second
          if(data.prix[0].prix == "Une télé") {
            expect(data.prix[0].gagnant.nom).toEqual("Participant1 Test");
          } else {
            expect(data.prix[1].gagnant.nom).toEqual("Participant1 Test");
          }
          done();
        });
      }, 1000);
    });

    var idElemEv = constants.EVENT_ID;
    it('Retrieve all draws (2) for an event (with id '+idElemEv+')', function(done) {
      $httpBackend.whenGET(constants.URL_SERVER+'amc-tiragesorts/all-event/'+idElemEv).passThrough();
      setTimeout(function() {
        DrawsFactory.getDrawsEvent(idElemEv).then(function(data) {
          expect(data.length).toEqual(2);
          expect(data[0].description).toEqual("Un super prix1");
          expect(data[1].description).toEqual("Un super prix2");
          done();
        });
      }, 1000);
    });
  });
});
