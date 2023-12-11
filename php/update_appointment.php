<?php
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$updatedData = $data['data'];

try {
    $updateFields = '';
    foreach ($updatedData as $key => $value) {
        $updateFields .= "$key = :$key, ";
    }
    $updateFields = rtrim($updateFields, ', ');

    $stmt = $conn->prepare("UPDATE appointments SET $updateFields WHERE id = :id");

    // Bind parameters
    $stmt->bindParam(':id', $id);
    foreach ($updatedData as $key => &$value) {
        $stmt->bindParam(":$key", $value);
    }

    // Execute the statement
    $stmt->execute();

    // Return success
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    // Return an error message
    echo json_encode(['success' => false, 'error' => 'Error updating appointment: ' . $e->getMessage()]);
}

// Close the database connection
$conn = null;
?>
