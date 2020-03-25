<?php
    require('./connect.php');
    
    $n_name = $_POST["n_name"];
    $t_type = $_POST["t_type"];
    $_dif = $_POST["_dif"];

    $sql = "INSERT INTO equation (n_name,t_type,_dif) VALUES ('$n_name','$t_type','$_dif');";
    echo $sql;

  if($connect->query($sql) === TRUE){
        $check = array(1 => "success");
        echo json_encode($check);
  }
  else {
        $check = array(1 => "fail");
        echo json_encode($check);
  }

  $connect->close();

 ?>