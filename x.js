function country_change() {
    if ($('#country').val() == 'United States') {
      $('.ak-us-billing-fields').show().each(function () {
        $(this).children('input').prop('disabled', false);
      });
      $('.ak-intl-billing-fields').hide();
      $('.cards-non-us').hide();
      $('.cards-us').show();
    } else {
      $('.ak-us-billing-fields').hide();
      $('.ak-intl-billing-fields').show().each(function () {
        $(this).children('input').prop('disabled', false);
      });
      $('.cards-non-us').show();
      $('.cards-us').hide();
    }
}