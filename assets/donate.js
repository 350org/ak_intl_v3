let paypalFieldOptionSelectedStepThree = false;

$(document).keydown(function (e) {
  const which = e.which;
  if (which === 13) {
    e.preventDefault();
  }
});


function clear_radio_buttons() {
    $('input.ak-amount-radio-button').prop('checked', false);
  }

  function clear_other() {
    $('#ak-other-amount-field').val("");
  }

  function update_total() {
    var total = 0.0;
    $('.ak_product_inputs').each(function (i) {
      // max == 1 produces checkboxes for these
      if (this.type == "checkbox" && !this.checked) {
        return;
      }

      // check that quantity is a valid int
      var quantity = this.value;
      if (quantity.length == 0 || ! /^[1-9]\d*$/.test(quantity)) {
        return;
      }

      // and price is a valid dollar amount
      var price_element = $('#' + this.id + '_price');
      var price = price_element.attr("data-price") || price_element.text();
      if (price.length == 0 || !/^[1-9]\d*(\.\d\d)?$/.test(price)) {
        return;
      }

      total += parseInt(quantity) * parseFloat(price);
    });

    $('.ak_candidate_inputs').each(function (i) {
      // check that amount is a valid amount
      var amount = this.value;
      if (amount.length == 0 || ! /^[0-9]\d*(\.\d\d)?$/.test(amount)) {
        return;
      }

      total += parseFloat(amount);
    });

    // look for checked off donation amounts
    var amount_checked = $('input:radio[name=amount]:checked').val();
    if (amount_checked) {
      total += parseFloat(amount_checked);
    } else {
      // or other amounts
      var other = $('#ak-other-amount-field').val();
      if (typeof other !== "undefined" &&
        other.length && /^\d*(\.\d{1,2})?$/.test(other))
        total += parseFloat(other);
    }

    var new_total = total === 0 ? "" : "" + (total % 1 != 0 ? total.toFixed(2) : total.toFixed(0));
    if (new_total != $('#total').html()) {
      $('.ak-donation-total-amount').html(new_total);
    }
    return total;
  }

  /* Amount buttons */
  function highlight_selected_amount_button() {
    $('label.ak-radio-checked').removeClass('ak-radio-checked');
    $(this).closest('label').addClass('ak-radio-checked');
  }

  /* Currency symbols */

  actionkit.utils.currencySymbols = {
    "AUD": "AUD",
    "BRL": "R$",
    "CAD": "CAD",
    "EUR": "€",
    "GBP": "£",
    "USD": "$",
    "NZD": "NZ$",
    "JPY": "¥",
    "ZAR": "R"
  }

    // Sherezz and Kimani Did this. Blame them
    actionkit.utils.ensureVisible = function () { console.log("Hi. ensurevisible is now an anonymous function.") };

    function redraw_currency_symbol() {
      var id = $('input[id^=id_currency_]:checked, option[id^=id_currency_]:selected').attr('id');
      var iso_code_match = /([A-Z][A-Z][A-Z])$/.exec(id);
      if (!iso_code_match) {
        return
      }
      var iso_code = iso_code_match[1];
      var currency_sym = actionkit.utils.currencySymbols[iso_code];
      $('.ak-currency-sym').text(currency_sym || '');
      $("#ak-amount-list").removeClass('currency-AUD currency-BRL currency-CAD currency-EUR currency-GBP currency-USD').addClass('currency-' + iso_code);
    }


    $(function () {
        $('input[id^=id_currency_], select[name="currency"], select[name="payment_account"]').on('change', redraw_currency_symbol);
        redraw_currency_symbol();

        // preselect a currency with a url parameter
        var arg_currency = '{{ args.currency|default:"false" }}';
        if (arg_currency && typeof actionkit.utils.currencySymbols[arg_currency] !== 'undefined') {
          $('#id_currency_' + arg_currency).prop('selected', true);
          redraw_currency_symbol();
        }
      });


  // Change donation type value whether custom field is set to both-recurring or both
  $(function () {
    $('.toggle-donation-type').click(function () {
      if ($('#id_donation_type_toggle').data('donation-type') === 'both-recurring') {
        if ($('#id_donation_type_toggle').prop('checked')) {
          $('#donation_type').val("single");
        } else {
          $('#donation_type').val("recurring");
        }
      } else {
        if ($('#id_donation_type_toggle').prop('checked')) {
          $('#donation_type').val("recurring");
        } else {
          $('#donation_type').val("single");
        }
      }
    })
  });



  function scroll_to_top_of_box() {
    //Gets top of three step box
    var top_of_three_step_box = $('.ak-field-box.ak-donate-three-step').offset().top;
    $('html,body').animate({ scrollTop: top_of_three_step_box }, 'fast')
  }

  var three_step_initialized = 0;
  function three_step_reveal() {
    var current_step = $('input[name="ak-donate-step"]:checked').val();
    if (current_step != "2" && current_step != "3") {
      current_step = "1"
    }
    var speed = three_step_initialized ? 1 : 400;
    if (current_step == "1") {
      $('.ak-donate-area-step-2, .ak-donate-area-step-3').hide();
      $('.ak-donate-area-step-1, #ak-continue-button').fadeIn(speed);
      $('.ak-donate-step').removeClass('active-step');
      $('.ak-donate-step-1').addClass('active-step');

    } else if (current_step == "2") {
      $('.ak-donate-area-step-1, .ak-donate-area-step-3').hide();

      $('.ak-donate-area-step-2, #ak-continue-button').fadeIn(speed);
      $('.ak-donate-step').removeClass('active-step');
      $('.ak-donate-step-2').addClass('active-step');
    } else if (current_step == "3") {
      $('.ak-donate-area-step-1, .ak-donate-area-step-2, #ak-continue-button').hide();

      $('.ak-donate-area-step-3').fadeIn(speed);
      $('.ak-donate-step').removeClass('active-step');
      $('.ak-donate-step-3').addClass('active-step');

      if (paypalFieldOptionSelectedStepThree) {
        $('.ak-submit-button').css({ display: 'none' })
      } else {
        $("#ak-paypal-button").css({ display: 'none' })
      }
    }
  }

  function focus_field_if_blank(field_elt) {
    return (function () {
      if (!field_elt.val()) {
        field_elt.focus()
      }
    })
  }

  function show_tick(current_step) {
    if (current_step !== "3") {
      // hide step number
      $('input[name="ak-donate-step"]:checked')
        .closest('label')
        .find('span.ak-step-number')
        .addClass('hidden');

      // show tick
      $('input[name="ak-donate-step"]:checked')
        .closest('label')
        .find('span.ak-step-complete')
        .removeClass('hidden');
    }
  }

  function hide_tick(current_step) {
    if (current_step !== "3") {
      // show step number
      $('input[name="ak-donate-step"]:checked')
        .closest('label')
        .find('span.ak-step-number')
        .removeClass('hidden');

      // hide tick
      $('input[name="ak-donate-step"]:checked')
        .closest('label')
        .find('span.ak-step-complete')
        .addClass('hidden');
    }
  }

  function three_step_goto(next) {
    // trigger validation on the step we're leaving
    var current_step = $('input[name="ak-donate-step"]:checked').val();

    // skip validation if we're going backwards
    if (current_step < next) {
      validate_step(current_step);

      if (!step_has_errors) {
        show_tick(current_step);
        change_step_one_label(current_step);
      } else {
        hide_tick(current_step);
      }
    }

    // can't skip over a step unless it's already been completed
    if ((!step_has_errors) && (current_step == 1) && (next == 3)) {
      validate_step("2");
      if (step_has_errors) {
        $('#ak-donate-step-2').prop('checked', true);
        three_step_reveal();
        return;
      }
    }

    // allow the user to go back even if there are errors
    if (current_step > next || !step_has_errors) {
      // only mark current step as complete if it has no errors
      $('#ak-donate-step-' + next).prop('checked', true);
      three_step_reveal();
      scroll_to_top_of_box();
    }
  }

  function validate_product_count(field) {
    var product_count = field.value;
    if (product_count == "" || product_count == "0") {
      return true
    }

    product_count = parseInt(product_count);
    if (product_count < 1) {
      return actionkit.forms.errorMessage('product:choose');
    }
    var product_max = parseInt($(field).attr('max'));
    if (product_max && product_count > product_max) {
      var err_msg = actionkit.forms.errorMessage('product:max');
      err_msg = err_msg.replace("{0}", product_max);
      return err_msg
    }
    return true
  }

  // even for recognized users we still need to require all user fields
  actionkit.forms.alwaysRequireUserFields = true;

  /* used to limit AK built-in validation to particular fields by step */
  var doing_step_validation = false;
  var validate_fields = [];

  function actionkitValidationErrors(errors, field) {
    // only want this running during step validation
    if (!doing_step_validation) {
      return;
    }

    // trim out validation errors we don't care about on this step
    var to_delete = [];
    step_has_errors = false;
    for (var key in errors) {
      parts = key.split(':');
      if (validate_fields.indexOf(parts[0]) == -1) {
        to_delete.push(key);
      } else {
        step_has_errors = true;
      }
    }
    for (var i = 0; i < to_delete.length; i++) {
      delete errors[to_delete[i]];
    }
  }


  function three_step_initialize() {
    if ($('.ak-err').is(":visible")) {
      var has_errors = [];
      if ($('.ak-donate-area-step-1').find('.ak-err').length) {
        has_errors.push($('.ak-donate-area-step-1'));
      }
      if ($('.ak-donate-area-step-2').find('.ak-err').length) {
        has_errors.push($('.ak-donate-area-step-2'));
      }
      if ($('.ak-donate-area-step-3').find('.ak-err').length) {
        has_errors.push($('.ak-donate-area-step-3'));
      }

      if (has_errors.length == 1) {
        // just one pane with errors?  show it
        has_errors[0].show();
      } else if (has_errors.length > 1) {
        // show all if errors on multiple steps
        $('.ak-donate-area-step-1, .ak-donate-area-step-2, .ak-donate-area-step-3').show();
        $('#ak-continue-button').hide();
      }
    }
    three_step_initialized = 1;
  }

  $(function () {
    // three-step vs. one-step UI
    if ($('form.ak-donate-three-step').length == 0) {
      $('.ak-donate-three-step-visible').hide();
    } else {
      $('.ak-donate-three-step-hidden').hide();
      three_step_reveal();
      window.actionkitFormReady = three_step_initialize;
      $('#ak-continue-button').on('click', function (evt) {
        // letting this event go will trigger our onsubmit and lead to validation woe
        evt.preventDefault();
        three_step_advance();
      });
      $('.ak-donate-step-1').on('click', function (evt) {
        evt.preventDefault();
        three_step_goto('1');
      });
      $('.ak-donate-step-2').on('click', function (evt) {
        evt.preventDefault();
        three_step_goto('2');
      });
      $('.ak-donate-step-3').on('click', function (evt) {
        evt.preventDefault();
        three_step_goto('3');
      });
    }
  });

  function product_ids() {
    return $("[data-product]").map(function (i, el) {
      return $(el).data("product");
    }).toArray();
  }

  function product_infos() {
    return product_ids().map(function (id) {
      return product_info(id);
    });
  }


  // calculate subtotals if products exist
  function calculate_product_subtotals() {
    var subtotal = 0;
    product_infos().forEach(function (info) {
      $('.ak_product_subtotal_' + info.id).text(info.subtotal.toFixed(2));
      subtotal += info.subtotal;
    });
    $('#ak-donation-subtotal-amount').text(subtotal.toFixed(2));
  }

  $(function () {
    calculate_product_subtotals();

    $('.ak_product_inputs').on('change', function () {
      calculate_product_subtotals();
    });
  });

  //calculate subtotals total
  function calculate_product_subtotals_total() {
    var amounts = [];
    for (var i = 1; i < $('#ak-product-list tr').length; i++) {
      var id = product_ids[i - 1];
      amounts.push(parseFloat($('.ak_product_subtotal_' + id).text()));
    }
    var subtotal = amounts.reduce(function (a, b) { return a + b; }, 0);
    $('#ak-donation-subtotal-amount').text(subtotal.toFixed(2));
  }

  $(function () {
    calculate_product_subtotals();
    $('.ak_product_inputs').on('change', function () {
      calculate_product_subtotals();
    });
  });


  // Standard luhn check to detect mistyped credit card numbers
  // from https://gist.github.com/DiegoSalazar/4075533
  function valid_credit_card(value) {
    if (/[^0-9-\s]/.test(value)) {
      return false;
    }
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) {
          nDigit -= 9;
        }
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) == 0;
  }

  function valid_credit_card_code(value) {
    if (/[^0-9-\s]/.test(value)) {
      return false;
    }
    value = value.replace(/\D/g, "");
    if (value.length == 3 || value.length == 4) {
      return true;
    }
    return false;
  }

    // not 100% the same as Django but pretty close
    var email_regExp = /^\s*((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\s*$/i;
    function valid_email(email) {
      return email_regExp.test(email);
    }

    // check for currency param and set default
    var getUrlParameter = function (sParam) {
        var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

        for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
        }
    };
