<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <!-- <script type="module" src="../src/enchant.js"></script> -->

    <script src="../src/merge/enchant-1.0.min.js"></script>
</head>
<body>

    <div class="elem"></div>
    <div class="elem"></div>
    <div class="elem">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
    </div>
    <div class="elem"></div>
    <div class="elem"></div>

    <div class="elem2"></div>
    <div class="elem2"></div>
    <div class="elem2"></div>
    <div class="elem2"></div>
    <div class="elem2"></div>
    
    <script type="module">
        import { E } from "./../src/enchant.js";

        E(document.body).css("background-color: #333;");

        E(".elem2 {all}").css("background-color: red; width: 100px; height: 100px; display: inline-block;");

        E(".elem2 {1 >> last}").css("background-color: blue", true);

        console.log(E(".elem2 {last}"))

        // E("span {all}").css("width: 20px; height: 20px; display: inline-block; background-color: yellow;");

        // E(".elem {2}").within("span {1 & last}").css("width: 20px; height: 20px; display: inline-block; background-color: orange;")

        // console.log(E(".elem {>2}").within(E(".elem2 {all}")));
    </script>
</body>
</html>