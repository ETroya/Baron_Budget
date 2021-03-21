const FILES_TO_CACHE =[
    "/",
    "./icons/icon-192x192.png",
    "./icons/icon-512x512.png",
    "db.jd",
    "/index.html",
    "index.js",
    "/styles.css"
]

const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1"

//Install
self.addEventListener("install", function(event){
    event.WaitUntil(
        caches.open(CACHE_NAME).then(cache=>{
            console.log("files were created")
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting()
});
//Activate
self.addEventListener("activate",function (event){
    event.waitUntil(
        caches.keys().then(keylist=>{
            return Promise.all(
                keyList.map(key=>{
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME){
                        console.log ("Remove old data", key);
                        return caches.delete(key);
                    }
                })
            )
        })
    )
    self.clients.claim();
})


