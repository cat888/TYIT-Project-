<html>
<head>
	<title>newform</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" type="text/css" href="file:///C:/Users/Dell/Downloads/bootstrap-5.0.2-dist/css/bootstrap.min.css">
	<script type="text/javascript" src="file:///C:/Users/Dell/Downloads/bootstrap-5.0.2-dist/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
<body>
	<div class="container">

		<div class="first">
			<div class="inner-box" id="box">
				<div class="front-form">
                    <h2>LOGIN</h2>
                    <form>
                    	<input type="Username" class="input-box" placeholder="Your Username" required>
                    	<input type="Password" class="input-box" placeholder="Password" required>
                    	<button type="submit" class="sub-btn">Submit</button>
                    	<input type="checkbox"><span>Remember Me</span>
                    </form>
                    <button type="button" class="btn" onclick="openRegister()">I'm new here</button>
                    <a href="">Forget password</a>
				</div>
				<div class="back-form">
                    <h2>REGISTER</h2>
                    <form>
                    	<input type="text" class="input-box" placeholder="Your Name" required>
                    	<input type="email" class="input-box" placeholder="Your email-id" required>
                    	<input type="Password" class="input-box" placeholder="Password" required>
                    	<button type="submit" class="sub-btn">Submit</button>
                    	<input type="checkbox"><span>Remember Me</span>
                    </form>
                    <button type="button" class="btn" onclick="openLogin()">I have an account</button>
                    <a href="">Forget password</a>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
	var box=document.getElementById("box");
	function openRegister(){
		box.style.transform="rotateY(-180deg)";
	}
	function openLogin(){
		box.style.transform="rotateY(0deg)";
	}
	</script>
</body>

</html>