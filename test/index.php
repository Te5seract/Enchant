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
    </div>
    
    <script type="module">
        import { E } from "./../src/enchant.js";

        E(document.body).css("background-color: #333;");

        console.log(E(".elem2").CSSVal("height"))
            
    </script>
</body>
</html>