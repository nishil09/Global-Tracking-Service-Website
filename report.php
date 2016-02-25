<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Reverse Geocoding</title>
    <link href="/maps/documentation/javascript/examples/default.css" rel="stylesheet">
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <style type="text/css">
      #map {
        width: 0px;
        height: 0px;
      }
    </style>
    <link href="report.css" rel="stylesheet" type="text/css" />
    <link href="/maps/documentation/javascript/examples/default.css" rel="stylesheet">
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

<?php
   session_start();
if (!isset($_SESSION['username'])) {
header('Location: index.html');
}
//echo $_SESSION['username'];
    mysql_connect("mysql.0hosting.org","u367658576_rajan","9427409905");
    mysql_select_db("u367658576_rajan");
      $user = mysql_real_escape_string($_SESSION['username']);
     // echo $user;

    $imei1=mysql_query("SELECT imei AS val FROM signup WHERE uname='$user'");
    
    $name1=mysql_query("SELECT name AS val FROM signup WHERE uname='$user'");
	
	$detail1=mysql_query("SELECT detail AS val FROM signup WHERE uname='$user'");

    $imei=mysql_fetch_assoc($imei1);
    $name=mysql_fetch_assoc($name1);
	$detail=mysql_fetch_assoc($detail1);
    //echo $name['val'];

    $newval=mysql_real_escape_string($imei['val']);
    $newname=mysql_real_escape_string($name['val']);
	$newdetail=mysql_real_escape_string($detail['val']); 
//echo $newval;

    $q=mysql_query("SELECT * FROM rajan WHERE imei='$newval'");
  

    $counter=0;
    $i=0;
    $latr=Array();
    $longir=Array();
   $hour=Array();
   $min=Array();
   $sec=Array();
   $dayofmonth=Array();
   $year=Array();
   $month=Array();

  
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
         $res=mysql_query("SELECT `hourofday` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $hour[$i]=mysql_real_escape_string($res1['val']);



        $res=mysql_query("SELECT `minute` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $min[$i]=mysql_real_escape_string($res1['val']);

        $res=mysql_query("SELECT `second` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $sec[$i]=mysql_real_escape_string($res1['val']);

        $res=mysql_query("SELECT `dayofmonth` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $dayofmonth[$i]=mysql_real_escape_string($res1['val']);

        $res=mysql_query("SELECT `month` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $month[$i]=mysql_real_escape_string($res1['val']);

        $res=mysql_query("SELECT `year` As val FROM `rajan` WHERE lat='$r[lat]' AND longi='$r[longi]'");
        $res1=mysql_fetch_assoc($res);
        $year[$i]=mysql_real_escape_string($res1['val']);




        $latr[$i]=$r['lat']/1000000;
        $longir[$i]=$r['longi']/1000000;
        $i=$i+1;
        $counter=$counter + 1;
       

 
     }
?>

    <script type="text/javascript">
      /**
       * Called on the intiial page load.
       */
	  var bhavnagar = new google.maps.LatLng(<?php echo $lat; ?>,<?php echo $longi; ?>);
     var geocoder;
     var infowindow2;
     var latlng = new google.maps.LatLng(21.7700,72.1500);

      
      var neighborhoods = [
        new google.maps.LatLng(<?php echo $lat; ?>,<?php echo $longi; ?>),
        new google.maps.LatLng(<?php echo $lat1; ?>,<?php echo $longi1; ?>),
        new google.maps.LatLng(<?php echo $lat2; ?>,<?php echo $longi2; ?>),
        new google.maps.LatLng(<?php echo $lat3; ?>,<?php echo $longi3; ?>)
      ];

      var markers = [];
      var iterator = 0;var infowindow = new google.maps.InfoWindow({
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
	   
	   
	   
	   
	   
	   
	   
	   
	   
      var map;
      var infowindow;
	  var rajanaddress = new google.maps.LatLng(52.520816, 13.410186);
      function init() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: new google.maps.LatLng(37.44, -122.14),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var ad=0;
        var id = [];
        var a="0";

        //for(ad=0;ad<60;ad++)
        while(ad<60)
        {
        var geocoder = new google.maps.Geocoder(); 
        geocoder.geocode({latLng:ar[ad]}, function(results, status) 
        {
          if (status == google.maps.GeocoderStatus.OK) 
          {
            if (results[0]) 
            {
				var addr=results[1].formatted_address;
			    document.getElementById(a).innerHTML=results[1].formatted_address;
              //document.write(add);
			  //alert(a);
            }
          }
        });
 a++;
 ad++;
        alert(a);
        }
	  }
	  function place(){
		var geocoder = new google.maps.Geocoder(); 
        geocoder.geocode({latLng:ar[ad]}, function(results, status) 
        {
          if (status == google.maps.GeocoderStatus.OK) 
          {
            if (results[0]) 
            {
				var addr=results[1].formatted_address;
			    document.getElementById(a).innerHTML=results[1].formatted_address;
              //document.write(add);
			  //alert(a);
            }
          }
        });
 a++;
 ad++;
        alert(a);
		
	  }
    
      // Register an event listener to fire once when the page finishes loading.
      google.maps.event.addDomListener(window, 'load', init);
    </script>
  </head>
  <body onload="initialize()">
    
    <div class="logo">
    <img src="reportlogo.png"/>
    </div>
    
    <div class="header">
    <p><b>&nbsp;&nbsp;&nbsp;Report</b></p>
    </div>
    
    <div class="welcomeuser">
    <new class="wl"><b></b></new>
    </div>
    
    <div class="left">
    <table width="100%" border="1" bordercolor="#000000">
    <tr class="th" align="center">
		<th>No.</th>
		<th>Latitude</th>
		<th>Longitude</th>
		<th>Hour</th>
                <th>Minute</th>
                <th>Second</th>
                <th>Day</th>
                <th>Month</th>
                <th>Year</th>
		<th onClick="place()">Place</th>
	</tr>
    <?php 
	for($j=0;$j<60;$j++)
		{       
        	echo "<tr class=tr><td width=100px>";
			echo $j;
			echo "</td>";
			echo "<td>";
			echo mysql_real_escape_string($latr[$j]);
			echo "</td>";
			echo "<td>";
			echo mysql_real_escape_string($longir[$j]);
			echo "</td>";
			echo "<td>";
			echo ""+mysql_real_escape_string($hour[$j])+"";
                        echo "</td>";
                        echo "<td>";
			echo mysql_real_escape_string($min[$j]);
			echo "</td>";
                        echo "<td>";
			echo mysql_real_escape_string($sec[$j]);
			echo "</td>";
                        echo "<td>";
			echo mysql_real_escape_string($dayofmonth[$j]);
			echo "</td>";
                        echo "<td>";
			echo mysql_real_escape_string($month[$j]);
			echo "</td>";
                        echo "<td>";
			echo mysql_real_escape_string($year[$j]);
			echo "</td>";

                        echo "<td>";
			//echo mysql_real_escape_string($latr[$j]);
			echo "<label id=".$j."></label>";
			echo "</td></tr>";	
	}
    ?>
       
    </table>
    </div>

    <div class="map"><div id="map"></div></div>

    
    
  </body>
</html>
