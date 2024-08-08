<?php
// Path to the counter file
$file = 'counter.txt';

// Check if the file exists, if not, create it and set count to 0
if (!file_exists($file)) {
    file_put_contents($file, '0');
}

// Read the current count
$currentCount = file_get_contents($file);

// Increment the count
$newCount = (int)$currentCount + 1;

// Write the new count back to the file
file_put_contents($file, $newCount);

// Optional: Output the count (useful for debugging)
echo "<script>console.log('Count: $newCount');</script>";
?>
