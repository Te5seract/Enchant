<?php
if (isset($_POST["name"])) {
    $name1 = $_POST["name"];
    $name2 = $_POST["name2"];
    $name3 = $_POST["name3"];

    $names = [];
    
    array_push($names, [
        "name1" => $name1, 
        "name2" => $name2, 
        "name3" => $name3
    ]);

    echo json_encode($names);
}