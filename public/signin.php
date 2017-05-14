<?php
    if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['email']) and isset($_POST['password']))
    {
        echo $_POST['email'];
        echo $_POST['password'];
    }
    function func()
    {
        // do stuff  

    }
?>