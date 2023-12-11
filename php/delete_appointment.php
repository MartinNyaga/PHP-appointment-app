<?php
include 'db_connection.php';

// Get the appointment ID from the request
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

try {
    // Delete the appointment with the given ID
    $stmt = $conn->prepare("DELETE FROM appointments WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    // Return success
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    // Return an error message
    echo json_encode(['success' => false, 'error' => 'Error deleting appointment: ' . $e->getMessage()]);
}

// Close the database connection
$conn = null;
?>
