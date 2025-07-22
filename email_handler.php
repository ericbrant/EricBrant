<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $message = htmlspecialchars($_POST["message"]);

  // For demonstration, just display the inputs:
  echo "Thank you, $name. We received your message:<br />";
  echo nl2br($message);
  
  // To email:
  // mail("your@email.com", "New contact form message", $message, "From:" . $email);
}
?>
