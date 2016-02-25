<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <title>Google Maps JavaScript API v3 Example: Marker Animations Loop</title>
    <link href="/maps/documentation/javascript/examples/default.css" rel="stylesheet">
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

    <?php
    mysql_connect("mysql2.000webhost.com","a7230347_rajan","rajan6533");
    mysql_select_db("a7230347_rajan");
    
    $q=mysql_query("SELECT * FROM rajan ORDER BY minute ");
    
    $i=0;
    $latr=Array();
    $longir=Array();




    
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

        $latr[$i]=$r['lat']/1000000;
        $longir[$i]=$r['longi']/1000000;
        $i=$i+1;

print "<pre>";print_r($latr[$i]);print_r($r['lat']);print"</pre><br>";
 print_r($latr);
 
     }
 print "print_r($latr);";      
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

      var map;
      var ar = [];

      
      var jArray1= <?php echo json_encode($latr); ?>;
      var jArray2= <?php echo json_encode($longir); ?>;

      document.write(jArray1[0]);
     




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
          animation: google.maps.Animation.DROP
        }));
        iterator++;
      }
    </script>
  </head>
  <body onload="initialize()">
    <div id="map-canvas" style="width: 800px; height: 500px;">map div</div>
    
  </body>
</html>
