# Enkel lokal webserver for å teste appen på PC: http://localhost:8081
$root = Join-Path $PSScriptRoot 'timelogg'
$types = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript'; '.webmanifest'='application/manifest+json'; '.svg'='image/svg+xml'; '.png'='image/png'; '.json'='application/json' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add('http://localhost:8081/')
$l.Start()
Write-Host 'Serving on http://localhost:8081/'
while ($l.IsListening) {
  $c = $l.GetContext()
  $p = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))
  if ($p -eq '') { $p = 'index.html' }
  $f = Join-Path $root $p
  if ((Test-Path $f -PathType Leaf) -and ([IO.Path]::GetFullPath($f).StartsWith($root))) {
    $b = [IO.File]::ReadAllBytes($f)
    $ct = $types[[IO.Path]::GetExtension($f)]
    if ($ct) { $c.Response.ContentType = $ct }
    $c.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $c.Response.StatusCode = 404 }
  $c.Response.Close()
}
