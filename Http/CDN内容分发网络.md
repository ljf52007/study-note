`CDN,Content Delivery Network`,内容分发网络.

## `CDN`的必要性

- 服务器(包括云服务器)一定有一个物理位置,访问服务器的客户端如果距离服务器太远,或者服务器附近有很多客户端同时访问,都会导致访问速度缓慢,也给服务器造成巨大压力.
- 服务器都会有一定几率碰到宕机的问题(服务器发生故障,无法正常工作),如果单靠一台服务器提供服务,容易造成网络瘫痪.

## `CDN`的实现

简单的说,`CDN`就是匹配一台最适合当前客户端的服务器来提供服务(最适合的服务器一般是由客户端与服务器的距离,以及该服务器当前分配的访问任务来决定的).

**具体怎么实现的呢?**

1. 浏览器访问一个域名,如果这个域名开通了`CDN`,那么解析该域名的`DNS`解析服务器会添加一条`CDN`专用的解析记录.这条解析记录会让域名被解析之后,指向一个`CDN`网络专用的处理`DNS`请求的服务器.
2. `DNS`服务器会给浏览器返回一台负载均衡系统服务器的`IP`地址,该服务器专门用来给各个请求设备分配合适的`CDN`服务器.
3. 浏览器访问负载均衡系统服务器,负载均衡系统服务器会根据浏览器的地址,在`CDN`网络中匹配一台各种条件都比较适合给客户端提供服务的一台服务器(一般是离得比较近和被分配的访问任务比较少的),将这台服务器的`IP`地址返回给浏览器.
4. 浏览器收到`CDN`服务器的`IP`地址后,访问这台`CDN`服务器,向它请求网站的文件资源.

**很多文件资源一开始是只存储在本源服务器的,浏览器怎么向它请求资源呢?**

1. 在给一个域名开通`CDN`服务的时候,会通过`CDN`后台进行设置,告诉`CDN`网络该域名原始服务器`IP`地址,简称源站`IP`;
2. 被请求资源的`CDN`服务器,在收到客户端的请求后,会查找自身有没有相关的资源缓存,如果没有,就会向`CDN`网络中的上层缓存服务器中去拉取,如果上层服务器也没有找到该资源,就会继续往上查找,一直找到源站.
3. 在源站获取请求资源后,会在`CDN`网络这条请求路径的每一层`CDN`服务器做一个缓存,并由指定的`CDN`服务器把资源发送给客户端,如此一来客户端就能打开该域名的网站了.
4. 而通过`CDN`网络,如果有其他客户端也请求了这个网站的资源,就可以直接从`CDN`网络中有缓存的`CDN`服务器上请求到资源.

## `CDN`预热

预热功能是指提交`URL`预热请求后,源站将会主动将对应的资源缓存到`CDN`服务器,如此一来,浏览器即使是首次请求资源文件,也能直接从最近的`CDN`服务器缓存中获取到最新的请求资源,无需再回源站获取.预热功能会提高缓存命中率.

## `CDN`刷新

刷新功能是指提交`URL`刷新或目录刷新请求后,`CDN`服务器的缓存内容将会被强制过期,如此一来,浏览器向`CDN`服务器请求资源时,`CDN`服务器会通过`CDN`网络,再次回源站获取对应的资源返回给浏览器,并将其缓存.刷新功能会降低缓存命中率.