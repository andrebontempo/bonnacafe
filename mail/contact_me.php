<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'andre.lnx@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Contato de Cliente do Bonna Café:  $name";
$email_body = "Você recebeu uma nova mensagem do seu formulário em seu WebSite(Bonna Café).\n\n"."Veja os Detalhes:\n\nNome: $name\n\ne-Mail: $email_address\n\nMensagem:\n$message";
$headers = "From: Bonna Café<feedback.clientes@bonnacafe.com.br>\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>