<?php

// CONNECT TO THE DATABASE
	require_once 'config/db_config.php';
	
// A QUICK QUERY ON A FAKE USER TABLE
	//$query = "SELECT * FROM `tbl_projects`";
	//$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

// GOING THROUGH THE DATA
	/*$arr = array();
	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$arr[] = $row;	
		}
	}
	else {
		echo 'NO RESULTS';	
	}*/
	
// CLOSE CONNECTION
	mysqli_close($mysqli);

//JSON-encode the response
	echo $json_response = json_encode($arr);

?>
