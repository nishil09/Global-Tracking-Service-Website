   <?php
$con = mysql_connect("mysql.0hosting.org","u367658576_rajan","9427409905");
	
	if (!$con)
 	 {
 	 die('Could not connect: ' . mysql_error());
 	 }
	mysql_select_db("u367658576_rajan",$con);
  $uname=$_GET['uname'];
  $pword=$_GET['pwd'];
  $name=$_GET['name'];
  
  $detail=$_GET['detail'];
  $tel=$_GET['tel'];
  $imei=$_GET['imei'];
  $group=$_GET['group'];
  
	$group1 = mysql_real_escape_string($_GET['group']);

if(isset($_GET['uname']))//If a username has been submitted
	{
	$username = mysql_real_escape_string($_GET['uname']);//Some clean up :)
	 
	$check_for_username = mysql_query("SELECT uname FROM signup WHERE uname='$username'");
	//Query to check if username is available or not
	 	if(mysql_num_rows($check_for_username))
	{
	echo 'Username Not Available';//If there is a  record match in the Database - Not Available
        header('Location: signup1.html');
	}
	else
	{
      $sql=mysql_query("INSERT INTO `signup`(`uname`,`pword`,`name`,`detail`,`tel`,`imei`,`group`) VALUES ('".$uname."','".$pword."','".$name."','".$detail."','".$tel."','".$imei."','".$group1."')");
       header('Location: index.html');
	}

	}
    
   
?>