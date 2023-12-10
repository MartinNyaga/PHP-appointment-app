<?php
try {
    // Using __DIR__ to get the absolute path to the current directory(The php directory)
    $dbPath = __DIR__ . '/app.db';

    $conn = new PDO("sqlite:$dbPath");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    die();
}
?>