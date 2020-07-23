<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script type="module" src="../src/enchant.js"></script>

    <!-- <script src="../src/merge/enchant.min.js"></script> -->
</head>
<body>

    <div class="container">
        <div class="elem2"></div>
        <div class="elem2"></div>
        <div class="elem2" stamp="title"></div>
        <div class="elem2"></div>
        <div class="elem2"></div>
    </div>
<!-- 
    <div class="elem testA testB something">
        <span>
            <ul>
                <li class="test1"><a class="test-point"></a></li>
                <li class="test2"><a class="test-point"></a></li>
                <li class="test3"><a class="test-point"></a></li>
                <li class="test4"><a class="test-point"></a></li>
            </ul>
            <div>
                <span class="target"></span>
            </div>
        </span>
    </div>
    <div class="elem">wh65yrt</div>
    <div class="elem">rjuy</div>
    <div class="elem">shrt</div>
    <div class="elem">sthrbg</div> -->

    <div class="test-text">
    example text one
    </div><br>

    <div class="test-text">
    EXAMPLE TEXT TWO 
    </div><br>

    <div class="test-text">
    example text three
    </div><br>

    <div class="test-text">
        other example text four
    </div>
    
    <script type="module">
        import { E } from "./../src/enchant.js";

        E(document.body).css("background-color: #333;");

        E(".test-text").changeCase("upper");

        E(".test-text {1}").changeCase("lower");

        E(".test-text {2}").changeCase("title");

        E(".test-text {last}").changeCase("sentence");


        E(".elem {all}").css("width: 100px; height: 100px; background-color: red; float: left; margin: 3px;");
        
        // E(".elem2 {all}").within(".target {all}").css("color: blue;", true);
        E(".elem2 {1}").within(".target {all}").css("color: blue;", true);

        // console.log(E(".elem2 {all}").detach(".elem2 {1>>3}"))

        // console.log(E(".elem").search("2"));


        // E(document.body).search("te").css("width: 100px; height: 100px; background-color: red;");

        // E(document).events("keydown, click, mousemove", (e, t) => {
        //     console.log(E(e.type).is("click", "keydown"));
        // });

        // E(".elem {all}").setAttr("title=box, value=test, alt=alternate");

        // E(".elem {0 >> 2}").delAttr("value, alt");
            
    </script>
</body>
</html>