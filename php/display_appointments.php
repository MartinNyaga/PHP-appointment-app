<?php
include 'db_connection.php';

try {
    // Select all records from the 'appointments' table in the app database
    $stmt = $conn->query("SELECT * FROM appointments");
    $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;

//This will Return the $appointments array as JSON
header('Content-Type: application/json');
echo json_encode($appointments);
?>
