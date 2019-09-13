<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>{{$article->title}} | {{$site->name}}</title>
    <meta name="author" content="Raiper34">
    <meta name="description" content="{{$article->description}}">
    <meta name="keywords" content="{{$article->keywords}}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
<nav class="teal">
    <div class="nav-wrapper">
        <a href="/" class="brand-logo">&nbsp;{{$site->name}}</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            @foreach ($menuItems as $item)
            <li><a href="{{$item->article->url}}">{{$item->title}}</a></li>
            @endforeach
        </ul>
    </div>
</nav>
<ul class="sidenav" id="mobile-demo">
    @foreach ($menuItems as $item)
    <li><a href="{{$item->article->url}}">{{$item->title}}</a></li>
    @endforeach
</ul>

<!-- Content -->
<main class="blue-grey lighten-5">
    <div class="container">
        <h1>{{$article->title}}</h1>
        <div class="flow-text">
            {!!$article->content!!}
        </div>
        @isset($category)
        @if ($category)
        <div>
            @foreach ($category->articles as $categoryArticle)
            <div class="col s12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">{{$categoryArticle->title}}</span>
                        <p class="flow-text">{{$categoryArticle->description}}</p>
                    </div>
                    <div class="card-action">
                        <span>{{\Carbon\Carbon::parse($categoryArticle->created_at)->format('j.n.Y H:i')}}</span>
                        <a href="{{$categoryArticle->url}}" class="right">More</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        @endif
        @endisset
    </div>
</main>

<!-- Footer -->
<footer class="page-footer teal">
    <div class="container">
        <div class="row">
            <div class="col">
                <h5 class="white-text">Links</h5>
                <ul>
                    @foreach ($menuItems as $item)
                    <li><a class="grey-text text-lighten-3" href="{{$item->article->url}}">{{$item->title}}</a></li>
                    @endforeach
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
<script type="text/javascript">
    M.AutoInit();
</script>
</body>

</html>
