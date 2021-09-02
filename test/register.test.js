/* global describe, it */

var chai = require('chai')
  , sinon = require('sinon')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {

  describe('registering a valid credential from YubiKey 5C', function() {
    var verify = sinon.spy(function(id, cb) {
    });
    var register = sinon.spy(function(id, publicKey, cb) {
      console.log('REGISTER!');
      console.log(id);
      console.log(publicKey)
      
      return cb(null, { id: '500' });
    });
  
    var strategy = new Strategy(verify, register);
    var user;
  
    before(function(done) {
      chai.passport(strategy)
        .success(function(u) {
          user = u;
          done();
        })
        .error(function(err) {
          console.log(err);
        })
        .req(function(req) {
          req.body = {
            "rawId": "JYrR3EvvQJNqG0i_OwJckOkbzq4YJWviotG4hig9wA_Qdxm-eBEHfsYqBJKTtXMasL-RD9CFOlcag48icK3E8Q",
            "response": {
              "attestationObject": "o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEcwRQIgX6Gu-qQl37z3nTm2wNRwuoTnAvNYg0CeQnCVU25Hd6kCIQDtbKMA-pYZsb2yAM8fHb4EPP8hENE2pvPfGJ3IKIC-bmN4NWOBWQLBMIICvTCCAaWgAwIBAgIEGKxGwDANBgkqhkiG9w0BAQsFADAuMSwwKgYDVQQDEyNZdWJpY28gVTJGIFJvb3QgQ0EgU2VyaWFsIDQ1NzIwMDYzMTAgFw0xNDA4MDEwMDAwMDBaGA8yMDUwMDkwNDAwMDAwMFowbjELMAkGA1UEBhMCU0UxEjAQBgNVBAoMCVl1YmljbyBBQjEiMCAGA1UECwwZQXV0aGVudGljYXRvciBBdHRlc3RhdGlvbjEnMCUGA1UEAwweWXViaWNvIFUyRiBFRSBTZXJpYWwgNDEzOTQzNDg4MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEeeo7LHxJcBBiIwzSP-tg5SkxcdSD8QC-hZ1rD4OXAwG1Rs3Ubs_K4-PzD4Hp7WK9Jo1MHr03s7y-kqjCrutOOqNsMGowIgYJKwYBBAGCxAoCBBUxLjMuNi4xLjQuMS40MTQ4Mi4xLjcwEwYLKwYBBAGC5RwCAQEEBAMCBSAwIQYLKwYBBAGC5RwBAQQEEgQQy2lIHo_3QDmT7AonKaFUqDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4IBAQCXnQOX2GD4LuFdMRx5brr7Ivqn4ITZurTGG7tX8-a0wYpIN7hcPE7b5IND9Nal2bHO2orh_tSRKSFzBY5e4cvda9rAdVfGoOjTaCW6FZ5_ta2M2vgEhoz5Do8fiuoXwBa1XCp61JfIlPtx11PXm5pIS2w3bXI7mY0uHUMGvxAzta74zKXLslaLaSQibSKjWKt9h-SsXy4JGqcVefOlaQlJfXL1Tga6wcO0QTu6Xq-Uw7ZPNPnrpBrLauKDd202RlN4SP7ohL3d9bG6V5hUz_3OusNEBZUn5W3VmPj1ZnFavkMB3RkRMOa58MZAORJT4imAPzrvJ0vtv94_y71C6tZ5aGF1dGhEYXRhWMRJlg3liA6MaHQ0Fw9kdmBbj-SuuaKGMseZXPO6gx2XY0EAAAAAAAAAAAAAAAAAAAAAAAAAAABAJYrR3EvvQJNqG0i_OwJckOkbzq4YJWviotG4hig9wA_Qdxm-eBEHfsYqBJKTtXMasL-RD9CFOlcag48icK3E8aUBAgMmIAEhWCD_qP03xLd0Fa62u9UkEHcytTm6KlUPz6tnQZuhUQkw9CJYIPcdmYgIb_ToIA9KpwNyE_6otrQ3xO-n0VKaC4Ke8u1m",
              "clientDataJSON": "eyJjaGFsbGVuZ2UiOiJNVEl6TkEiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIn0"
            },
            "id": "JYrR3EvvQJNqG0i_OwJckOkbzq4YJWviotG4hig9wA_Qdxm-eBEHfsYqBJKTtXMasL-RD9CFOlcag48icK3E8Q",
            "type": "public-key"
          };
        })
        .authenticate();
    });
  
    it('should register credential', function() {
      var publicKey = '-----BEGIN PUBLIC KEY-----\n' +
'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/6j9N8S3dBWutrvVJBB3MrU5uipV\n' +
'D8+rZ0GboVEJMPT3HZmICG/06CAPSqcDchP+qLa0N8Tvp9FSmguCnvLtZg==\n' +
'-----END PUBLIC KEY-----\n';
      
      expect(register).to.be.calledWith('JYrR3EvvQJNqG0i_OwJckOkbzq4YJWviotG4hig9wA_Qdxm-eBEHfsYqBJKTtXMasL-RD9CFOlcag48icK3E8Q', publicKey);
    });
  
    it('should supply user', function() {
      expect(user).to.deep.equal({ id: '500' });
    });
    
    it('should not call verify', function() {
      expect(verify).to.not.have.been.called;
    });
  });
  
  describe('registering a valid credential from Soft U2F', function() {
    var verify = sinon.spy(function(id, cb) {
    });
    var register = sinon.spy(function(id, publicKey, cb) {
      console.log('REGISTER!');
      console.log(id);
      console.log(publicKey)
      
      return cb(null, { id: '500' });
    });
  
    var strategy = new Strategy(verify, register);
    var user;
  
    before(function(done) {
      chai.passport(strategy)
        .success(function(u) {
          user = u;
          done();
        })
        .error(function(err) {
          console.log(err);
        })
        .req(function(req) {
          req.body = {
            "rawId": "GU0lmsssQL3nKuu3Q5YtBTVfTLUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "response": {
              "attestationObject": "o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEYwRAIgTM7jGmhOvbujIW0oDFiGKq5BjB31_Vg7oncdXCUmEJMCIGxBoeX20y-Ai01Mma1nhSle4lOEuK-TRzvwo2A7MwevY3g1Y4FZAYIwggF-MIIBJKADAgECAgEBMAoGCCqGSM49BAMCMDwxETAPBgNVBAMMCFNvZnQgVTJGMRQwEgYDVQQKDAtHaXRIdWIgSW5jLjERMA8GA1UECwwIU2VjdXJpdHkwHhcNMTcwNzI2MjAwOTA4WhcNMjcwNzI0MjAwOTA4WjA8MREwDwYDVQQDDAhTb2Z0IFUyRjEUMBIGA1UECgwLR2l0SHViIEluYy4xETAPBgNVBAsMCFNlY3VyaXR5MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE9pyrJBRLtO-H9w8jHFzU9XgErPjgxrKz41IYPYA5H2vSedJqTINkdObC2iOT_6wdUDRsXCOQZVeTPsuT_27e0aMXMBUwEwYLKwYBBAGC5RwCAQEEBAMCAwgwCgYIKoZIzj0EAwIDSAAwRQIhAP4iHZe46uoSu59CFIUPSBdlteCVk16ho9ZtD7FvOfciAiBk19wvXGw4Kvdl9XhqObCxSpdFKO993yECFRuIStRBemhhdXRoRGF0YVjKSZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NBAAAAAAAAAAAAAAAAAAAAAAAAAAAARhlNJZrLLEC95yrrt0OWLQU1X0y1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAClAQIDJiABIVggMXwd2qrp2AidRk9IBDeAxxEUU43gV-dShmc0kKQoWOgiWCBxDyslVXoA1M7RYzrpFrGWEK3z1Hk9Wso1GeUBnPrXJQ",
              "clientDataJSON": "eyJjaGFsbGVuZ2UiOiJNVEl6TkEiLCJjbGllbnRFeHRlbnNpb25zIjp7fSwiaGFzaEFsZ29yaXRobSI6IlNIQS0yNTYiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIn0"
            },
            "id": "GU0lmsssQL3nKuu3Q5YtBTVfTLUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "type": "public-key"
          };
        })
        .authenticate();
    });
  
    it('should register credential', function() {
      var publicKey = '-----BEGIN PUBLIC KEY-----\n' +
'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEMXwd2qrp2AidRk9IBDeAxxEUU43g\n' +
'V+dShmc0kKQoWOhxDyslVXoA1M7RYzrpFrGWEK3z1Hk9Wso1GeUBnPrXJQ==\n' +
'-----END PUBLIC KEY-----\n';
      
      expect(register).to.be.calledWith('GU0lmsssQL3nKuu3Q5YtBTVfTLUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', publicKey);
    });
  
    it('should supply user', function() {
      expect(user).to.deep.equal({ id: '500' });
    });
    
    it('should not call verify', function() {
      expect(verify).to.not.have.been.called;
    });
  });

});
