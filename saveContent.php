<?php
// Database connection
$conn = new mysqli('localhost', 'username', 'password', 'ethyrea');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$category = $data['category'];
$content = $conn->real_escape_string(json_encode($data['data']));

// Save to database
$sql = "INSERT INTO $category (content) VALUES ('$content')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
