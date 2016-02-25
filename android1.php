<?php
	$con = mysql_connect("mysql.0hosting.org","u367658576_rajan","9427409905");
	
	if (!$con)
 	 {
 	 die('Could not connect: ' . mysql_error());
 	 }
	mysql_select_db("u367658576_rajan",$con);
	
        $id=$_GET['id'];  
	$imei=$_GET['imei'];
	$lat=$_GET['lat'];
	$longi=$_GET['longi'];
        $hourofday=$_GET['hourofday'];
        $minute=$_GET['minute'];
        $second=$_GET['second'];
        $year=$_GET['year'];
        $month=$_GET['month'];
        $dayofmonth=$_GET['dayofmonth'];
        $dayofyear=$_GET['dayofyear'];
	
	$sql=mysql_query("INSERT INTO rajan VALUES($id,'$imei',$lat,$longi,$hourofday,$minute,$second,$year,$month,$dayofmonth,$dayofyear)");
	
?>