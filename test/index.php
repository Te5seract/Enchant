<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script src="../src/methods/attrHandling.js"></script>
    <script src="../src/methods/cssHandling.js"></script>
    <script src="../src/methods/domHandling.js"></script>
    <script src="../src/methods/eventHandling.js"></script>
    <script src="../src/methods/miscHandling.js"></script>
    <script src="../src/methods/queryHandling.js"></script>
    <script src="../src/selector.js"></script>
    <script src="../src/enchant.js"></script>

    <!-- <script src="../src/merge/enchant-2.0.min.js"></script> -->
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
    
    <script>
        E(document.body).css("background-color: #333;");

        var more = E(".elem2 {all}");

        console.log(E(".elem {>2}").within(E(".elem2 {all}")));
    </script>
</body>
</html>