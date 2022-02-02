import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home.vue'
import discovery from 'views/discovery/discovery.vue';
import videoPage from 'views/video/videoPage.vue';
import collection from 'views/collection/collection.vue';
import dailyRecommend from 'views/dailyRecommend/dailyRecommend.vue';
import musicListPage from 'views/musicListPage/musicListPage.vue';
import searchPage from 'views/searchPage/searchPage.vue';
import recommend from 'views/discovery/discoveryChild/recommend.vue';
import musicList from 'views/discovery/discoveryChild/musicList.vue';
import billboard from 'views/discovery/discoveryChild/billboard.vue';
import singer from 'views/discovery/discoveryChild/singer.vue';
import searchSong from 'views/searchPage/searchPageChild/searchSong.vue';

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 设置默认路径，网页一打开就进入
  // {
  //   path: '/',
  //   redirect: '/home/discovery/recommend'
  // },
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 首页
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/discovery',
    children: [
      {
        // 发现音乐
        path: 'discovery',
        name: 'discovery',
        component: discovery,
        redirect: '/home/discovery/recommend',
        children: [
          {
            // 个性推荐
            path: 'recommend',
            name: 'recommend',
            component: recommend
          },
          {
            // 歌单
            path: 'musicList',
            name: 'musicList',
            component: musicList
          },
          {
            // 排行榜
            path: 'billboard',
            name: 'billboard',
            component: billboard
          },
          {
            // 歌手
            path: 'singer',
            name: 'singer',
            component: singer
          },
        ]
      },
      {
        // 视频
        path: 'videoPage',
        name: 'videoPage',
        component: videoPage
      },
      {
        // 收藏
        path: 'collection',
        name: 'collection',
        component: collection
      },
      {
        // 每日推荐
        path: 'dailyRecommend',
        name: 'dailyRecommend',
        component: dailyRecommend
      },
      {
        // 歌单详细内容
        path: 'musicListPage/:id',
        name: 'musicListPage',
        component: musicListPage
      },
      {
        // 搜索内容
        path: 'searchPage/:id',
        name: 'searchPage',
        component: searchPage,
        redirect: '/home/searchPage/searchSong/:id',
        children: [
          {
            // 单曲搜索页
            path: '/home/searchPage/searchSong/:id',
            name: 'searchSong',
            component: searchSong
          }
        ]
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
