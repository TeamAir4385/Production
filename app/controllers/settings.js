var args = arguments[0] || {};
//DS
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
//DS
function clickedLogin(e) {
	Alloy.createController('login').getView();
}
//test
//switch
//http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.UI.Switch
//Might need to add things for iOS
//DS
var pushSwitch = Ti.UI.createSwitch({
  value:true // mandatory property for iOS 
});
//$.settings.add(pushSwitch);
//DS
pushSwitch.addEventListener('change',function(e){
  Ti.API.info('Switch value: ' + pushSwitch.value);
});
//toast?
function outputState(){
    Ti.API.info('Switch value: ' + $.pushSwitch.value);
}

$.settings.open();
