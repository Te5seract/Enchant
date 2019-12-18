<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script type="module" src="../src/enchant.js"></script>

    <!-- <script src="../src/merge/enchant-1.0.min.js"></script> -->
</head>
<body>

    <div class="elem">
        <a class="test"></a>
        <a class="test"></a>
        <a class="test"></a>
        <a class="test"></a>
        <a class="test"></a>
    </div>
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

    <div class="elem2-all-elem"></div>
    <div class="elem2-all-elem"></div>
    <div class="elem2-all-elem"></div>
    <div class="elem2-all-elem"></div>
    <div class="elem2-all-elem"></div>
    
    <script type="module">
        import { E } from "./../src/enchant.js";

        E(document.body).css("background-color: #333;");

        console.log(E(".elem2-all-elem{all}"))
        
        // E().ajax({
        //     method : "POST",
        //     url : "test.php",
        //     data : "name=test&name2=anothertest&name3=lasttest"
        // }, (x) => {
        //     E(x.json).forEach((i) => {
        //         console.log(i.node);
        //     });
        // });
    </script>
</body>
</html>