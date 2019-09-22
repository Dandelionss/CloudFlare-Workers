addEventListener("fetch", event => {
  let url = new URL(event.request.url);
  url.hostname = "www.google.com"; //改成你想反代的网站

  let request = new Request(url, event.request);
  event.respondWith(
    fetch(request, {
      headers: {
        'Referer': 'https://www.cloudflare.com/', //referer头,不必修改
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' //
      }
    })
  );
});
