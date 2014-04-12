var API_KEY = "AIzaSyA4GRhEujHG7CPcQBGQhPJ3ffthXBw2uOs",
  BLOG_ID = "6506288147786344967";

var API = {

  debugCb: function(r) {
    console.log(r);
  },

  getUrl: function(url, cb, x) {
    if (!cb) cb = API.debugCb;
    x = j();
    x.cb = cb;
    x.onreadystatechange = API.handleStateChanges;
    x.open('GET', url, true);
    x.send();
  },

  handleStateChanges: function() {
    if (this.readyState != 4) return;
    this.cb(JSON.parse(this.responseText));
  }

};


API.blogger = {

  url: {
    blogs: t('http://localhost:8080/blogs/#{this.num}'),
    blogsReal: t('https://www.googleapis.com/blogger/v2/blogs/#{this.blogId}&key=#{this.key}')
  },

  getBlogs: function(num, cb) {
    API.getUrl(API.blogger.url.blogs({
      num: num,
      key: API_KEY,
      blogId: BLOG_ID
    }), cb);
  }
}
