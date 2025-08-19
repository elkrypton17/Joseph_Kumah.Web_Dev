<?php
/**
 * Contact Form Handler for Hon. Joseph Kwame Kumah's Website
 * This script processes contact form submissions and sends email notifications
 */

// Set error reporting for debugging (remove in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Define variables and set to empty values
$name = $email = $subject = $message = "";
$errors = [];
$success = false;

// Function to sanitize form data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Process form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validate name
    if (empty($_POST["name"])) {
        $errors[] = "Name is required";
    } else {
        $name = sanitize_input($_POST["name"]);
        // Check if name only contains letters and whitespace
        if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
            $errors[] = "Only letters and white space allowed in name";
        }
    }
    
    // Validate email
    if (empty($_POST["email"])) {
        $errors[] = "Email is required";
    } else {
        $email = sanitize_input($_POST["email"]);
        // Check if email address is well-formed
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid email format";
        }
    }
    
    // Validate subject
    if (empty($_POST["subject"])) {
        $errors[] = "Subject is required";
    } else {
        $subject = sanitize_input($_POST["subject"]);
    }
    
    // Validate message
    if (empty($_POST["message"])) {
        $errors[] = "Message is required";
    } else {
        $message = sanitize_input($_POST["message"]);
    }
    
    // If no errors, proceed with sending email
    if (empty($errors)) {
        // Recipient email address
        $to = "joseph.kumah@parliament.gh";
        
        // Additional headers
        $headers = "From: $name <$email>" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Email body
        $email_body = "You have received a new message from your website contact form.\n\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Subject: $subject\n";
        $email_body .= "Message:\n$message\n";
        
        // Attempt to send email
        if (mail($to, "Website Contact: $subject", $email_body, $headers)) {
            $success = true;
            
            // Reset form fields after successful submission
            $name = $email = $subject = $message = "";
            
            // Store in database (optional - commented out for now)
            /*
            $servername = "localhost";
            $username = "username";
            $password = "password";
            $dbname = "contact_form";
            
            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);
            
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            
            // Prepare and bind
            $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message, submission_date) VALUES (?, ?, ?, ?, NOW())");
            $stmt->bind_param("ssss", $name, $email, $subject, $message);
            $stmt->execute();
            $stmt->close();
            $conn->close();
            */
            
        } else {
            $errors[] = "There was an error sending your message. Please try again later.";
        }
    }
}

// Return JSON response for AJAX requests
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    header('Content-Type: application/json');
    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your message. We will get back to you soon.']);
    } else {
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission - Hon. Joseph Kwame Kumah</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background-color: #e30613;
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            margin: -20px -20px 20px;
        }
        .success {
            background-color: #006633;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .error {
            background-color: #e30613;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #e30613;
            color: white;
            border-radius: 5px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1px;
            text-decoration: none;
            margin-top: 20px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background-color: #006633;
            transform: translateY(-3px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Hon. Joseph Kwame Kumah</h1>
            <p>Member of Parliament for Kintampo North</p>
        </div>
        
        <?php if ($success): ?>
            <div class="success">
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We will get back to you soon.</p>
            </div>
        <?php elseif (!empty($errors)): ?>
            <div class="error">
                <h2>Error</h2>
                <ul style="list-style-type: none; padding: 0;">
                    <?php foreach ($errors as $error): ?>
                        <li><?php echo $error; ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <p>You will be redirected back to the homepage in a few seconds.</p>
        <a href="index.html" class="btn">Return to Homepage</a>
    </div>
    
    <script>
        // Redirect back to homepage after 5 seconds
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 5000);
    </script>
</body>
</html>
