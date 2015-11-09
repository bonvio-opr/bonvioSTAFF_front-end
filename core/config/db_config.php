<?php

// CONNECT TO THE DATABASE

//define("DB_NAME", 'cms');
//define("DB_HOST", 'localhost');
//define("DB_USER", 'external');
//define("DB_PASS", 'y3l0l3k0r');
//define("DB_PREFIX", "tbl");
//define("DB_CHARSET", "utf8");


// CONNECT TO THE DATABASE
	$DB_NAME = 'cms';
	$DB_HOST = 'localhost';
	$DB_USER = 'external';
	$DB_PASS = 'y3l0l3k0r';

	$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

	if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}


?>
