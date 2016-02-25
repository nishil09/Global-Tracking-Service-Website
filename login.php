    <?php
session_start();
$con = mysql_connect("mysql.0hosting.org","u367658576_rajan","9427409905");
	
	if (!$con)
 	 {
 	 die('Could not connect: ' . mysql_error());
 	 }
	mysql_select_db("u367658576_rajan",$con);
  $uname=$_POST['uname'];
  $pword=$_POST['pwd'];
   

   $username = mysql_real_escape_string($_POST['uname']);
   $password = mysql_real_escape_string($_POST['pwd']);
$login = mysql_query("SELECT uname,pword FROM signup WHERE uname='$username' AND pword='$password'");
	 	


if(mysql_num_rows($login) == 1)
	{
$_SESSION['username'] = $_POST['uname'];
header('Location: r_final8.php');
        
	}
	else
	{
    header('Location: index1.html');
}
?>