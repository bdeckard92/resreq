$(document).ready(function () {
  // hide logout button on initial load
  $('.btn-logout').hide();
  $('.avatar').hide();

  var lock = new Auth0Lock('w0afrsXkjEvuLPkJAmX7iI3GhWDVKTFB', 'bchang55.auth0.com', options, {
    auth: {
      params: {
        scope: 'openid name email'
      } //Details: https://auth0.com/docs/scopes
    }
  });

  // Check if there is an existing access token

  var access_token = localStorage.getItem('access_token');
  // log user in, if there is a token
  if (null != access_token) {
    lock.getUserInfo(access_token, function (err, profile) {
      if (err) {
        // Remove expired token (if any) from localStorage
        localStorage.removeItem('access_token');
        return alert('There was an error getting the profile: ' + err.message);
      } 
      else {
        // log user in and show their profile info
        retrieve_profile();
        show_profile_info(profile);
        console.log("user authenticated");
      }
    });
  }


  var options = {
    rememberLastLogin: true,
    autoclose: true,
    auth: {
      redirect: false
    }
  };

  



  $('.btn-login').click(function (e) {
    e.preventDefault();
    lock.show();
  });

  $('.btn-logout').click(function (e) {
    e.preventDefault();
    logout();
  })

  lock.on("authenticated", function (authResult) {
    lock.getUserInfo(authResult.accessToken, function (error, profile) {
      if (error) {
        // Handle error
        return;
      }

      localStorage.setItem('access_token', authResult.accessToken);
      // Display user information
      show_profile_info(profile);
    });
  });

  //retrieve the profile:
  var retrieve_profile = function () {
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

  var show_profile_info = function (profile) {
    $('.nickname').text(profile.nickname);
    $('.nickname').show();
    $('.btn-login').hide();
    $('.avatar').attr('src', profile.picture).show();
    $('.btn-logout').show();
  };

  var logout = function () {
    localStorage.removeItem('access_token');
    window.location.href = "/";
  };

  retrieve_profile();
});