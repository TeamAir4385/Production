<?php
//-- POST are variables from details.js
$fname 	= $_POST['fname'];
$lname 	= $_POST['lname'];
$email 	= $_POST['email'];
$phone 	= $_POST['phone'];

//-- clean up the javascript array
$toppings 	= str_replace('"','',substr(substr(stripslashes($_POST['toppings']),1),0,-1));
$toppings	= explode(",\n", $toppings);

//-- Where the order will be sent
$to = "ralkkai1337@gmail.com";
$subject = "Pizza Order!";
$message = "A new order has been submitted.<br/>";
$message .= $fname . "<br/>";
$message .= $lname . "<br/>";
$message .= $email . "<br/><br/>";
$message .= $phone . "<br/><br/>";



$message .= "</ul>";

//-- The headers will let us send HTML code as an email
$headers = "From: noreply@thepizzaplace.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

//-- if mail gets sent, return true, else return false. This gets handed off the our onload method in details.js
if (mail($to,$subject,$message,$headers))
{
	$response = array('mail' => true);
}
else
{
	$response = array('mail' => false);
}

echo json_encode($response);
?>