<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <title>Global Tracking Service</title>
    <link href="r_final8.css" rel="stylesheet" type="text/css" />
    <link href="/maps/documentation/javascript/examples/default.css" rel="stylesheet">
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	
    
<?php
session_start();
$con = mysql_connect("mysql.0hosting.org","u367658576_rajan","9427409905");
	
	if (!$con)
 	 {
 	 die('Could not connect: ' . mysql_error());
 	 }
	mysql_select_db("u367658576_rajan",$con);
  
   $day = mysql_real_escape_string($_GET['day']);
   $month1 = mysql_real_escape_string($_GET['month']);
   $year = mysql_real_escape_string($_GET['year']);
    


     $user = mysql_real_escape_string($_SESSION['username']);
       $imei1=mysql_query("SELECT imei AS val FROM signup WHERE uname='$user'");
    $imei=mysql_fetch_assoc($imei1);
    $newval=mysql_real_escape_string($imei['val']);

 $name1=mysql_query("SELECT name AS val FROM signup WHERE uname='$user'");
  $name=mysql_fetch_assoc($name1);
  $newname=mysql_real_escape_string($name['val']);


 $detail1=mysql_query("SELECT detail AS val FROM signup WHERE uname='$user'");
  $detail=mysql_fetch_assoc($detail1);
  $newdetail=mysql_real_escape_string($detail['val']);

    
 
   $intmonth=(int)$month1;
   if(1 < $intmonth && $intmonth <=12)
    {
    $intmonth = $intmonth-1;
   }
  else
   {
  $intmonth = 12;
   }
 $month=(String)$intmonth;
 echo $day;
echo $month;
echo $year;

   $result = mysql_query("SELECT  * FROM `rajan` WHERE dayofmonth='$day' AND month='$month' AND year='$year' AND imei='$newval'");
	 	


if(mysql_num_rows($result))
	{
         // $q=mysql_query("SELECT * FROM rajan WHERE dayofmonth='$day' , month='$month' , year='$year' AND imei='$newval'");
  

    $counter=0;
    $i=0;
    $latr=Array();
    $longir=Array();

      $hour=Array();
   $min=Array();
   $sec=Array();

    
    while($r=mysql_fetch_assoc($result))
     {
     

	$lat=$r['lat']/1000000;
	$longi=$r['longi']/1000000;
        $lat1=21.761233900000000000;
        $longi1=72.126062699999920000;
        $lat2=22.5700;
        $longi2=72.9300;
        $lat3=18.9647;
        $longi3=72.8258;
          $res=mysql_query("SELECT `hourofday` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $hour[$i]=mysql_real_escape_string($res1['val']);



        $res=mysql_query("SELECT `minute` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $min[$i]=mysql_real_escape_string($res1['val']);

        $res=mysql_query("SELECT `second` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $sec[$i]=mysql_real_escape_string($res1['val']);

        $latr[$i]=$r['lat']/1000000;
        $longir[$i]=$r['longi']/1000000;
        $i=$i+1;
        
       

 
     }

        
	}
	else
	{
header('Location: date1.php');
        
}
?>


    <script>
     var bhavnagar = new google.maps.LatLng(<?php echo $lat; ?>,<?php echo $longi; ?>);
      
      var neighborhoods = [
        new google.maps.LatLng(<?php echo $lat; ?>,<?php echo $longi; ?>),
        new google.maps.LatLng(<?php echo $lat1; ?>,<?php echo $longi1; ?>),
        new google.maps.LatLng(<?php echo $lat2; ?>,<?php echo $longi2; ?>),
        new google.maps.LatLng(<?php echo $lat3; ?>,<?php echo $longi3; ?>)
      ];

      var markers = [];
      var iterator = 0;
       var infowindow = new google.maps.InfoWindow({
        content: "hi"
    });

      var map;
      var ar = [];

      
      var jArray1= <?php echo json_encode($latr); ?>;
      var jArray2= <?php echo json_encode($longir); ?>;
    //  var jArray3= <?php echo json_encode($name); ?>;

   //  document.write(jArray3[0]);
    var jArray4= <?php echo json_encode($hour); ?>;
       var jArray5= <?php echo json_encode($min); ?>;
        var jArray6= <?php echo json_encode($sec); ?>;

     




      for(var z=0; z < jArray1.length; z++)
         {
            ar[z] = new google.maps.LatLng(jArray1[z],jArray2[z]);
         }
      
      function initialize() {
        var mapOptions = {
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: bhavnagar
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
        
        
	drop();
      }

      function drop() {
        for (var i = 0; i < jArray1.length; i++) {
          setTimeout(function() {
            addMarker();
          }, i * 2000);
        }
      }

      function addMarker() {
        markers.push(new google.maps.Marker({
          position: ar[iterator],
          map: map,
          draggable: false,
           title: "<?php echo $newname;?>"+"   "+"Time:"+jArray4[iterator]+":"+jArray5[iterator]+":"+jArray6[iterator]+"",
          animation: google.maps.Animation.DROP
        }));
        iterator++;
      }
google.maps.event.addListener(markers, 'mouseover', function() {
    infowindow.open(map,markers);
    });
infowindow.open(map,markers);
    </script>
  </head>
  <body onload="initialize()" bgcolor="#FFFFFF">

    <div class="header">
    <p><a class="nounderline" href="r_final8.php"><b>&nbsp;&nbsp;&nbsp;Global Tracking Service</b></a></p>
    </div>
    
    <div class="welcomeuser">
    <new class="wl"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome : <?php echo $newname; ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Locations for : <?php echo $day; ?>:<?php echo $month1; ?>:<?php echo $year; ?></b></new>
    
    </div>
    
    <div class="left">
    <table width="100%" border="1" bordercolor="#000000">
    <tr class="th" align="center">
    	<th> </th>
        <th>User</th>
        <th>Imei No.</th>
        <th>Detail</th>
    </tr>
    <tr class="tr">
    	<td> </td>
        <td><?php echo $newname; ?></td>
        <td><?php echo $newval; ?></td>
        <td><?php echo $newdetail; ?></td>
    </tr>
  
    </table>
    </div>
    
    <div class="group"><center>
  	<a href="group.php">Show Me In Group</a></center></div>
    
    <div class="left2">
    <form action="date.php" method="get">
    <table width="100%" border="1" bordercolor="#000000">
    <tr class="th" align="center">
    	<th colspan="2">Location For Certain Date</th>
    </tr>
    <tr class="tr">
    	<td width="10px"><b>Day</b></td>
        <td align="center"><input type="text" name="day" size="40"/></td>
    </tr>
    <tr class="tr">
    	<td width="10px"><b>Month<b></td>
        <td align="center"><input type="text" name="month" size="40"/></td>
    </tr>
    <tr class="tr">
    	<td width="10px"><b>Year<b></td>
        <td align="center"><input type="text" name="year" size="40"/></td>
    </tr>
    <tr class="tr">
    	<td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" border="1" value="submit"/></td>
    </tr>    
    </table>
    </form>
    </div>


    <div class="map">
    <div id="map-canvas" style="width: 800px; height: 500px;">map div</div>
    </div>
   
    <div class="end">
    <p>
    &nbsp;&nbsp;&nbsp;Helpline No: Rajan-9426656649, Nishil-9998967232
    </p>
    </div>

   
    <div class="nounderline" style="position:absolute; top:18px; left:1150px; font-family:Calibri; font:bolder; font-size:25px; color:#FF0;">
    <a href="report.php">Report</a>
    </div>

    <div class="logout">
    <a href="logout.php">Logout</a>
    </div>

    <div id="geo" class="end"></div>
 
  </body>
</html>

