<!DOCTYPE html>
<html>
  <head>
    <meta name="viewporjavascript:document.forms['EditForm'].screen.value=3;document.forms['EditForm'].submit();t" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <title>Global Tracking Service</title>
    <link href="style1.css" rel="stylesheet" type="text/css" />
    <link href="/maps/documentation/javascript/examples/default.css" rel="stylesheet">
    <script src="https://maps.googleapis.com/maps/api/js?v=3.SDSFFGFCexp&sensor=false"></script>

    <?php
   session_start();
if (!isset($_SESSION['username'])) {
header('Location: index.html');
}
//echo $_SESSION['username'];
    mysql_connect("mysql.0hosting.org","u367658576_rajan","9427409905");
    mysql_select_db("u367658576_rajan");
      $user = mysql_real_escape_string($_SESSION['username']);
    //  echo $user;

    $id1=mysql_query("SELECT `group` As val FROM `signup` WHERE uname='$user'");
    
    $name1=mysql_query("SELECT name AS val FROM signup WHERE uname='$user'");
   
    $id=mysql_fetch_assoc($id1);
    $name=mysql_fetch_assoc($name1);
   // echo $name['val'];

    $newid=mysql_real_escape_string($id['val']);
 //echo $newid;
     $newname=mysql_real_escape_string($name['val']);
//echo $newval;

    $q=mysql_query("SELECT * FROM rajan WHERE id='$newid'");
     //ORDER BY year,month,dayofmonth,hourofday,minute,second
  

    $counter=0;
    $i=0;
    $latr=Array();
    $longir=Array();
    $name=Array();
    $hour=Array();
   $min=Array();
   $sec=Array();



    
    while($r=mysql_fetch_assoc($q))
     {
     

	$lat=$r['lat']/1000000;
	$longi=$r['longi']/1000000;
        $lat1=21.761233900000000000;
        $longi1=72.126062699999920000;
        $lat2=22.5700;
        $longi2=72.9300;
        $lat3=18.9647;
        $longi3=72.8258;
        $res=mysql_query("SELECT `imei` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $imeic=mysql_real_escape_string($res1['val']);


        $res=mysql_query("SELECT `hourofday` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $hour[$i]=mysql_real_escape_string($res1['val']);



        $res=mysql_query("SELECT `minute` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $min[$i]=mysql_real_escape_string($res1['val']);

        $res=mysql_query("SELECT `second` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $sec[$i]=mysql_real_escape_string($res1['val']);




        $res=mysql_query("SELECT `name` As val FROM `signup` WHERE imei='$imeic'");
        $res1=mysql_fetch_assoc($res);
        $name[$i]=mysql_real_escape_string($res1['val']);

        $res=mysql_query("SELECT `detail` As val FROM `signup` WHERE imei='$imeic'");
        $res1=mysql_fetch_assoc($res);
        $detail[$i]=mysql_real_escape_string($res1['val']);
       // echo $name[$i];

        $latr[$i]=$r['lat']/1000000;
        $longir[$i]=$r['longi']/1000000;
        $i=$i+1;
        $counter=$counter + 1;
       if($counter > 20)
        { break;
           }

 
     }
  // echo $_SESSION['username'];
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
      var jArray3= <?php echo json_encode($name); ?>;
       var jArray4= <?php echo json_encode($hour); ?>;
       var jArray5= <?php echo json_encode($min); ?>;
        var jArray6= <?php echo json_encode($sec); ?>;




   //  document.write(jArray3[0]);
     




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
           title: ""+jArray3[iterator]+""+"Time:"+jArray4[iterator]+":"+jArray5[iterator]+":"+jArray6[iterator]+"",
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
  <body onload="initialize()">
	
    <div class="header">
    <p><a class="nounderline" href="r_final8.php"><b>&nbsp;&nbsp;&nbsp;Global Tracking Service</b></a></p>
    </div>
    
    <div class="welcomeuser">
    <new class="wl"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome : <?php echo $newname; ?></b></new>
    </div>
    
    <div class="left">
    <table border=1>
		<tr class="th"><td align="center"><b>User</b></td>
			<td align="center"><b>Imei No.</b></td>
			<td align="center"><b>Detail</b></td>
		</tr>
    <?php
    $id1=mysql_query("SELECT `group` As val FROM `signup` WHERE uname='$user'");
    $id=mysql_fetch_assoc($id1);
	$i=0;   
	$name=Array();
	$imei=Array();
	$detail=Array();
	$newid=mysql_real_escape_string($id['val']);
	$q=mysql_query("SELECT * FROM `signup` WHERE `group`='$newid'");

	while($r=mysql_fetch_assoc($q))
	{
		$name[$i]=$r['name'];
		$imei[$i]=$r['imei'];
		$detail[$i]=$r['detail'];
		$i=$i+1;
	}
	for($j=0;$j<sizeof($name);$j++)
	{
		echo "<tr class=tr><td width=100px>";
		echo mysql_real_escape_string($name[$j]);
		echo "</td>";
		echo "<td>";
		echo mysql_real_escape_string($imei[$j]);
		echo "</td>";
		echo "<td width=120px>";
		echo mysql_real_escape_string($detail[$j]);
		echo "</td></tr>";	
	}
	?>
    </table>
    </div>
    
    <div class="map">
    <div id="map-canvas" style="width: 800px; height: 500px;">map div</div>
    </div>
    
    <div class="end">
    <p>
    &nbsp;&nbsp;&nbsp;Helpline No: Rajan-9426656649, Nishil-9998967232
    </p>
    </div>

    <div class="report" style="position:absolute; top:18px; left:1150px; font-family:Calibri; font:bolder; font-size:25px;">
    <a href="report.php">Report</a>
    </div>

    <div class="logout">
    <a href="logout.php">Logout</a>
    </div>

    
  </body>
</html>
