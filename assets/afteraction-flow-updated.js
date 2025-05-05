function show_share_tick(current_step) {
  // hide step number
  $('#afteraction-flow-share input[name="ak-donate-step"]:checked')
    .closest('label')
    .find('span.ak-step-number')
    .addClass('hidden');

  // show tick
  $('#afteraction-flow-share input[name="ak-donate-step"]:checked')
    .closest('label')
    .find('span.ak-step-complete')
    .removeClass('hidden');
}

$('.copy-link-share').on('click', function (e) {
  e.preventDefault();
  var initialShareURL = e.target.href;
  var linkButton = e.target;
  initialShareURL += `&action_id=${actionID}&akid=${akid}`;
  if (typeof gtag !== 'undefined') {
    gtag('event', 'scrolling-signup', {'click_id': 'thanksflow_share_copylink'});
  }
  $.ajax({
    method: 'GET',
    url: initialShareURL,
  }).done(function(shareURL) {
    navigator.clipboard.writeText(shareURL);
    linkButton.text = 'Link Copied!';
  }).fail(function() {
    navigator.clipboard.writeText(window.location.href);
  });
});