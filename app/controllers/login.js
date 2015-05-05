var args = arguments[0] || {};

function doOpen(e){
	var actionBar = e.source.activity.actionBar;

	//up window
	//http://docs.appcelerator.com/titanium/latest/#!/guide/Android_Action_Bar-section-36735509_AndroidActionBar-OtherActionBarFeatures

	if (actionBar) {
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			e.source.close();
		};

		e.source.activity.invalidateOptionsMenu();
	}	
}

function doLoginBtnClicked() {

	// create instance of the user model
	var user = Alloy.createModel('User');

	// call the extended model’s function
	user.login($.email.value, $.password.value, userActionResponseHandler);
};
function userActionResponseHandler(_resp) {
	if (_resp.success === true) {

		alert("You have successfully logged in.");
		$.loginText.text = _resp.model.id;
		// Do stuff after successful login.
		//Alloy.Globals.loggedIn = true;
		//Alloy.Globals.CURRENT_USER = _resp.model;

		//$.parentController.loginSuccessAction(_resp);
//secia's name goes here
	} else {
		// Show the error message and let the user try again.
		alert("Error logging in. Please try again.", _resp.error.message);

		//Alloy.Globals.CURRENT_USER = null;
		//Alloy.Globals.loggedIn = false;
	}
};

$.doLoginBtn.addEventListener('click', doLoginBtnClicked);
$.login.open();
