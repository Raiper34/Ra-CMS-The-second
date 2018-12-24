<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>{{$article->title}} | {{$site->name}}</title>
    <meta name="author" content="Raiper34">
    <meta name="description" content="{{$article->description}}">
    <meta name="keywords" content="{{$article->keywords}}">
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
        <a href="/" class="brand-logo">&nbsp;{{$site->name}}</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/">Home</a></li>
            @foreach ($menuItems as $item)
                <li><a href="{{$item->article->url}}">{{$item->title}}</a></li>
            @endforeach
        </ul>
    </div>
</nav>

<!-- Content -->
<main>
    <div class="container">
        <h1>{{$article->title}}</h1>
        <div class="flow-text">
            {!!$article->content!!}
        </div>
    </div>
</main>

<!-- Footer -->
<footer class="page-footer">
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
