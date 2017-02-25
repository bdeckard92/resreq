$(document).ready(function() {

  var profile1;

  var options = {
  rememberLastLogin: true,
  autoclose: true,
  auth: {
    redirect: false
  }
};
  
  var lock = new Auth0Lock('w0afrsXkjEvuLPkJAmX7iI3GhWDVKTFB', 'bchang55.auth0.com', options, {
    auth: {
      params: { scope: 'openid name email'  } //Details: https://auth0.com/docs/scopes
    }
  });

  // hide logout button on initial load
  $('.btn-logout').hide();
  $('.avatar').hide();

  $('.btn-login').click(function(e) {
    e.preventDefault();
    console.log('hello');
    lock.show();
  });

  $('.btn-logout').click(function(e) {
    e.preventDefault();
    logout();
  })

  lock.on("authenticated", function(authResult) {
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) {
        // Handle error
        return;
      }
      // profile1 = profile;
      localStorage.setItem('access_token', authResult.accessToken);
      // Display user information
      show_profile_info(profile);
    });
  });

  //retrieve the profile:
  var retrieve_profile = function() {
    var access_token = localStorage.getItem('accessToken');
    if (access_token) {
      lock.getUserInfo(access_token, function (err, profile) {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
        }
        // Display user information
        show_profile_info(profile);
        console.log(profile);
      });
    }
  };

  var show_profile_info = function(profile) {
    profile1 = profile;
     $('.nickname').text(profile.nickname);
     $('.nickname').show();
     $('.btn-login').hide();
     $('.avatar').attr('src', profile.picture).show();
     $('.btn-logout').show();
  };

  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  };

  retrieve_profile();
});