

(function (window, angular) {
    angular.module("maoyan_controllers", ["maoyan_services"])
        .controller("headerCtrl", ["$scope", "$location",function ($s, $l) {
            //切换锚点active状态
            $s.linkIndex = "/home" || $l.path();
            console.log($s.linkIndex);
            $s.linkTo = function (hash) {
                $s.linkIndex = hash;
            }
        }])
        .controller("homeCtrl", ["$scope",  "$interval", "$timeout", "myService",function ($s, $i, $t,m) {
            //请求电影数据
            $s.now_list = null;
            $s.coming_list = null;
            $s.hot_list = null;
            $s.isLoading = true;
            //正在热映
            m.jsonp("https://api.douban.com/v2/movie/in_theaters", {}, function (res) {
                if ($s.isLoading) $s.isLoading = false;
                $s.now_list = res;
                $s.$apply();
            });
            //即将上映
            m.jsonp("https://api.douban.com/v2/movie/coming_soon", {}, function (res) {
                if ($s.isLoading) $s.isLoading = false;
                $s.coming_list = res;
                $s.$apply();
            });
            //高分电影
            m.jsonp("https://api.douban.com/v2/movie/top250", {}, function (res) {
                if ($s.isLoading) $s.isLoading = false;
                $s.hot_list = res;
                $s.$apply();
            });
            
            //轮播图
            $s.slide = {};
            $s.slide.slide_imgs = [
                {url : "./img/01.jpg"},
                {url : "./img/02.jpg"},
                {url : "./img/03.jpg"},
                {url : "./img/04.jpg"},
                {url : "./img/05.jpg"},
                {url : "./img/06.jpg"}
            ];
            $s.slide.slide_num = -1;
            $s.slide.auto = function () {
                if ($s.slide.timer) $t.cancel($s.slide.timer);
                if ($s.slide.slide_num === $s.slide.slide_imgs.length - 1) {
                    $s.slide.slide_num = 0;
                } else {
                    $s.slide.slide_num++;
                }
                $s.slide.timer = $t(arguments.callee, 2000)
            };
            $s.slide.auto();
            
            $s.slide.showTo = function (index) {
                $s.slide.slide_num = index;
                $t.cancel($s.slide.timer);
                $t.cancel($s.slide.outTimer);
                $s.slide.outTimer = $t($s.slide.auto, 4000);
            };
            $s.slide.next = function () {
                $s.slide.auto();
                $t.cancel($s.slide.timer);
                $t.cancel($s.slide.outTimer);
                $s.slide.outTimer = $t($s.slide.auto, 4000);
            };
            $s.slide.prev = function () {
                if ($s.slide.slide_num === 0) {
                    $s.slide.slide_num = $s.slide.slide_imgs.length - 1;
                } else {
                    $s.slide.slide_num--;
                }
                $t.cancel($s.slide.timer);
                $t.cancel($s.slide.outTimer);
                $s.slide.outTimer = $t($s.slide.auto, 4000);
            }
        }])
        .controller("hotspotCtrl", ["$scope", function ($s) {
        
        }])
        .controller("moviesCtrl", ["$scope", "myService",function ($s, m) {
            $s.linkIndex = 1;
            $s.linkTo = function (index) {
                $s.linkIndex = index;
            };
            $s.isLoading = true;
            
            //电影条目数据
            $s.classify = {
                type : [
                    {tag : "全部"},
                    {tag : "喜剧"},
                    {tag : "爱情"},
                    {tag : "动画"},
                    {tag : "剧情"},
                    {tag : "恐怖"},
                    {tag : "惊悚"},
                    {tag : "科幻"},
                    {tag : "动作"},
                    {tag : "悬疑"},
                    {tag : "犯罪"},
                    {tag : "冒险"},
                    {tag : "战争"},
                    {tag : "奇幻"},
                    {tag : "运动"},
                    {tag : "家庭"},
                    {tag : "古装"},
                    {tag : "武侠"},
                    {tag : "西部"},
                    {tag : "历史"},
                    {tag : "传记"},
                    {tag : "歌舞"}
                ],
                area : [
                    {tag : "全部"},
                    {tag : "大陆"},
                    {tag : "美国"},
                    {tag : "韩国"},
                    {tag : "日本"},
                    {tag : "中国香港"},
                    {tag : "中国台湾"},
                    {tag : "泰国"},
                    {tag : "印度"},
                    {tag : "法国"},
                    {tag : "英国"},
                    {tag : "俄罗斯"},
                    {tag : "意大利"},
                    {tag : "德国"},
                    {tag : "波兰"},
                    {tag : "伊朗"},
                    {tag : "其他"}
                ],
                time : [
                    {tag : "全部"},
                    {tag : "2017"},
                    {tag : "2016"},
                    {tag : "2015"},
                    {tag : "2014"},
                    {tag : "2013"},
                    {tag : "2012"},
                    {tag : "2010"},
                    {tag : "更早"}
                ]
            };
            $s.movieType = "全部";
            $s.movieArea = "全部";
            $s.movieTime = "全部";
            m.jsonp("https://api.douban.com/v2/movie/search", {"tag" : "全部"}, function (data) {
                $s.$apply(function () {
                    $s.isLoading = false;
                    $s.classify.movies = data.subjects;
                });
            });
            $s.linkToTag = function (t, v) {
                switch (t) {
                    case "type":
                        $s.movieType = v;
                        break;
                    case "area":
                        $s.movieArea = v;
                        break;
                    case "time":
                        $s.movieTime = v;
                }
             m.jsonp("https://api.douban.com/v2/movie/search", {"tag" : v}, function (data) {
                 $s.classify.movies = data.subjects;
             })
            }
        }])
})(window, angular);