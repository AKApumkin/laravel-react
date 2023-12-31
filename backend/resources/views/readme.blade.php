<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Kamma Coding Test</title>
    <meta name="color-scheme" content="light dark">
    <link rel="stylesheet" href="github-markdown.css">
    <style>
        body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background-color: #0d1117;
            }
        }
    </style>
</head>
<body>
<article class="markdown-body">{!! Str::markdown(file_get_contents(base_path() . '/README.md')) !!}</article>
</body>
</html>
