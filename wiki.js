addEventListener('fetch', event => {
  event.respondWith(proxyRequest(event.request))
  
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function proxyRequest(request) {

    var rawUrl, prefix, targetUrl, newUrl;

    rawUrl = new URL(request.url);
    prefix = rawUrl.protocol+"//"+rawUrl.host+"/";

    if (rawUrl.href.startsWith(prefix)) {

        targetUrl = rawUrl.href.replace(new RegExp('^' + prefix), '');
        try{
            if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                newUrl = new URL(rawUrl.protocol + '//' + targetUrl);
            } else {
                newUrl = new URL(targetUrl);
            }
                
        }catch(e){
            return new Response('Bad Request', { status: 400, statusText: 'Bad Request' }); 
        }

        if (newUrl && newUrl.host.indexOf("wikipedia.org") == -1){
            targetUrl = (isPC(request.headers.get('user-agent')) ? "zh.wikipedia.org/":"zh.m.wikipedia.org/") 
                + targetUrl;   
        }
               
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = rawUrl.protocol + '//' + targetUrl;
        }

        console.log( targetUrl, newUrl ? newUrl.host : "0" );

        return await fetch(targetUrl);

    }

    return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
}

function isPC (userAgentInfo) {
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
