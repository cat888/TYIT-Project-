<!DOCTYPE html>
<html lang="en">
<head>
  <title>Myhome</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  .container{
    width: 1536px;
    height: 655px;
    margin-left: -8px;
    margin-top: 0px;
    /*background-color: red;*/
  }
  #img1
  {
    width: 1536px;
    height: 655px;
    margin-left: 0px;
    margin-top: 0px;
  }
  .navbar-inverse
  {
    margin-left: -8px;
    background-color: red;
    height: 50px;
    width: 1536px;    
  }
  .container-fluid
  {
    float: left;
  }
  .container-fluid ul
  {
      margin-left: 1000px;

  }

  .navbar-right li{
    
    float: left;
    padding: 3px;
    list-style: none;
    margin-left: 20px;
  }
  </style>
</head>
<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <ul class="nav navbar-nav navbar-right">
      <li><a href="regi.php"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="log.php"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav>
  
<div class="container">
  <img src="house.jpg" id="img1">
</div>

</body>
</html>
