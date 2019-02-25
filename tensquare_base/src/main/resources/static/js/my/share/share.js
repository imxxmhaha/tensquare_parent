  var url = location.origin + '/register.html';
  var img = location.origin + '/images/about-logo.png'
  var paramShare = {
    title: '注册邀请',
    description: '和生活注册邀请',
    img: img,
    url: url,
    code: 'register_invite',
  }
  new Share(paramShare);

  $("#register-invite").click(function() {
    $(".share-pop").fadeIn();
    $(".lincoapp-sharely-mask").removeClass("hide").addClass("show");
    $(".lincoapp-sharely-fixed").removeClass("hide").addClass("show");
  })

  $(".lincoapp-sharely-mask").click(function() {
    $(".lincoapp-sharely-mask").removeClass("show").addClass("hide");
    $(".lincoapp-sharely-fixed").removeClass("show").addClass("hide");
    $(".share-pop").fadeOut();
  })

  $("#btnCancel").click(function() {
    $(".lincoapp-sharely-mask").removeClass("show").addClass("hide");
    $(".lincoapp-sharely-fixed").removeClass("show").addClass("hide");
    $(".share-pop").fadeOut();
  })