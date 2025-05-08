function show_share_tick() {
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
