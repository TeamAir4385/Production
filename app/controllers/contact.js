var args = arguments[0] || {};
//DS
var win 		= Ti.UI.currentWindow;
var contactReq 	= Titanium.Network.createHTTPClient();

//DS - Each time you see this code, it's used to call the themed actionbar for Android.
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

//this will open an email once submit is clicked 
//DS - 
//Letty worked on the email code but I helped finish it and get it to do something.
//Still wish it was more underthe hood but ACS doesn't seem to handle client side emailing.
$.submit.addEventListener('click', function(e) {
	
	var emailDialog = Titanium.UI.createEmailDialog();
		emailDialog.setSubject("Please Sign Me Up!");
		emailDialog.setToRecipients(['wtcollegeofbusiness@gmail.com']);
		
		
	if (Ti.Platform.name == 'iPhone OS') {
		emailDialog.setMessageBody("<b>I'm curious about what the College of Business has to offer!" + '\n' + '\n' +
			'First Name: ' + $.fname.value + '\n' +
			'Last Name : ' + $.lname.value + '\n' +
			'Email: ' + $.email.value + '\n' +
			'Phone number: ' + $.phone.value + "</b>å");	
	    //emailDialog.setMessageBody("<b>I'm curious about what the College of Business has to offer!</b>å");
	    emailDialog.setHtml(true);
	    emailDialog.setBarColor('#336699');
	} else {
		emailDialog.setMessageBody("I'm curious about what the College of Business has to offer!" + '\n' + '\n' +
			'First Name: ' + $.fname.value + '\n' +
			'Last Name: ' + $.lname.value + '\n' +
			'Email: ' + $.email.value + '\n' +
			'Phone number: ' + $.phone.value);
		
	    //emailDialog.setMessageBody("I'm curious about what the College of Business has to offer!");
	}
	
	emailDialog.addEventListener('complete', function(e)
	{
	    if (e.result == emailDialog.SENT)
	    {
	        if (Ti.Platform.osname != 'android') {
	            // android doesn't give us useful result codes.
	            // it anyway shows a toast.
	            alert("Your Message Was Sent!");
	        }
	    } else {
	        alert("message was not sent. result = " + e.result);
	    }
	});
	
	emailDialog.open();
});


//opens
$.contact.open();