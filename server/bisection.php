<?php
  require('./connect.php');


  $sql = "SELECT * FROM equation where t_type = 'bisectioon'";

  $result = $connect->query($sql);
  $response = array();
  if($result->num_rows>0)
  {

    while($row = $result->fetch_assoc())
    {
      // echo " work";

      $response[] = $row;
      
    }
    echo json_encode($response);
  }
  else {
    echo "0 results";
  }

  $connect->close();

 ?>