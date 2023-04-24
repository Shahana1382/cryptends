<?php
    include('connection.php');
    $uname1 = $_POST['uname'];
    $upswd2 = $_POST['upswd'];

        //to prevent from mysqli injection
        $username = stripcslashes($uname1);
        $password = stripcslashes($upswd2);
        $username = mysqli_real_escape_string($con, $uname1);
        $password = mysqli_real_escape_string($con, $upswd2);

        $sql = "select *from register where uname1 = '$uname1' and upswd2 = '$upswd2'";
        $result = mysqli_query($con, $sql);
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
        $count = mysqli_num_rows($result);

        if($count == 1){
            header("location:main.html");
        }
        else{
            echo "<h1> Login failed. Invalid username or password.</h1>";
        }
?>
