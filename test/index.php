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

    <div class="container">
        <div class="elem2-all-elem"></div>
        <div class="elem2-all-elem"></div>
        <div class="elem2-all-elem" id="testA"></div>
        <div class="elem2-all-elem" id="testB"></div>
        <div class="elem2-all-elem"></div>
    </div>

    <div class="elem"></div>
    <div class="elem"></div>
    <div class="elem"></div>
    <div class="elem"></div>
    <div class="elem"></div>
    
    <script type="module">
        import { E } from "./../src/enchant.js";

        E(document.body).css("background-color: #333;");

        E(".container").prepend(E(".elem2-all-elem {1}")[0], E("#testB")[0]);

        // E(".elem2-all-elem {all}").css("width: 100px; height: 100px; float: left; margin: 3px; background-color: red");

        // var el = document.createElement("span");

        // E(".container").prepend(E().create("span", 3), E(".elem2-all-elem {2}")[0]);
        
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