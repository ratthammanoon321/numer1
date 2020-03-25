<?php
header("Access-Control-Allow-Origin:http://localhost:3000");
 $hostname = "database";
  // $hostname = "localhost";
  $username = "root";
   $password = "1111";
  // $password = "";
  $dbname = "thenumer";

  $connect = new mysqli($hostname,$username,$password,$dbname);

  if($connect->connect_error)
  {
    die("Connect Failed : " .$connect->connect_error);
  }
  //echo "Connect Successfully !!";
 ?>