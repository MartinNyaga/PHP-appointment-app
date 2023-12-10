<?php
include 'db_connection.php';

// This are the input fields named 'name', 'email', 'datetime',  and 'notes'
$name = $_POST['name'];
$email = $_POST['email'];
$datetime = $_POST['datetime'];
$notes = $_POST['notes'];

try {
    // Create a table if it doesn't exist
    $conn->exec("CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        datetime DATETIME,
        notes TEXT
    )");

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO appointments (name, email, datetime, notes) VALUES (:name, :email, :datetime, :notes)");

    // Bind parameters
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':datetime', $datetime);
    $stmt->bindParam(':notes', $notes);

    // Execute the statement
    $stmt->execute();

    echo "Form submitted successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>