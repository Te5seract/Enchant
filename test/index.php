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

    <div class="elem testA testB something">
        <span>
            <ul>
                <li class="test1"><a class="test-point"></a></li>
                <li class="test2"><a class="test-point"></a></li>
                <li class="test3"><a class="test-point"></a></li>
                <li class="test4"><a class="test-point"></a></li>
            </ul>
        </span>
    </div>
    <div class="elem"></div>
    <div class="elem"></div>
    <div class="elem"></div>
    <div class="elem"></div>
    
    <script type="module">
        import { E } from "./../src/enchant.js";

        E(document.body).css("background-color: #333;");

        // E(".elem {all}").css("width: 100px; height: 100px; background-color: red; margin: 3px; float: left;");

        // E(".elem").css("width: 100px; height: 100px; background-color: red; margin: 3px; float: left;");

        // E(".elem").events("click", (e, t) => {
        //     console.log(E(t).goTo("parent", "html"));
        // });

        E(".test1").css("width: 100px; height: 100px; background-color: red; margin: 3px; float: left;");

        E(".test1").events("click", (e, t) => {
            console.log(E(t).goTo("next", ".test4"));
        });
            
        
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