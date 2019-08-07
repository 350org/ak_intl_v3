jQuery(document).ready(function(jQuery){

	jQuery('<input>').attr({
		type: 'hidden',
		name: 'lists',
		value: '49'
	}).appendTo('form.ak-form');

	jQuery('<input>').attr({
		type: 'hidden',
		name: 'lists',
		value: '1'
	}).appendTo('form.ak-form');

  
  jQuery('#privacy_optin').click(function(){
		jQuery('<input>').attr({
			type: 'hidden',
			name: 'lists',
			value: '1'
		}).appendTo('form.ak-form');
  });
  jQuery('#privacy_optout').click(function(){
		jQuery('input[name=lists][value=1]').remove()
  });
});
