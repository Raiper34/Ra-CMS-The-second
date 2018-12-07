<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>{{$title}}</title>
    <meta name="author" content="Raiper34">
    <meta name="description" content="{{$description}}">
    <meta name="keywords" content="{{$keywords}}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <style>
        body {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }

        main {
            flex: 1 0 auto;
        }
    </style>
</head>

<body>

<!-- Header -->
<nav>
    <div class="nav-wrapper">
        <a href="#" class="brand-logo">&nbsp;RaCMS</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/">Home</a></li>
        </ul>
    </div>
</nav>

<!-- Content -->
<main>
    <div class="container">
        <h1>{{$title}}</h1>
        <div class="flow-text">
            {!!$content!!}
        </div>
    </div>
</main>

<!-- Footer -->
<footer class="page-footer">
    <div class="container">
        <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer
                    content.</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">
            © 2018 RaCMS The Second
            <a class="grey-text text-lighten-4 right" href="http://www.raiper34.net">Raiper34</a>
        </div>
    </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>

</html>
