<template>
  <div class="recommend">
    <!-- 轮播视图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
 <div
          class="swiper-slide"
          @click="goStore(item.url)"
          v-for="item in bannerList"
          :key="item.imageUrl"
        >
          <img class="imgUrl" :src="item.imageUrl" alt="" />
        </div>
      </div>
    </div>
    <p class="title">推荐歌单</p>
    <!-- 推荐的歌曲 -->
    <div class="musicblock">
      <!-- 歌曲 -->
      <div
        @click="goList(item.id)"
        v-for="item of songlist"
        :key="item.id"
        class="songlist"
      >
        <div class="imgView">
          <img class="image" :src="item.picUrl" alt="" srcset="" />
          <span class="imgtitle">{{ item.playCount }}</span>
        </div>
        <p class="listtext">{{ item.name }}</p>
      </div>
    </div>

    <!-- 最新歌曲 -->
    <div class="newsongs">
      <p class="bottom">最新音乐</p>
      <!-- 第一首推荐歌曲 num 1-->
      <div @click='goPlay(item.id)' v-for="item of song" :key="item.id" class="songs">
        <!-- 左侧歌曲 -->
        <div class="songs_shuiping">
          <!-- 歌曲标题 -->
          <div class="song_title">{{ item.song.name }}</div>
          <!-- 歌手 -->
          <div class="singer">
            <div class="sqq"><span class="sq">00</span></div>
            {{ item.song.artists[0].name }}-{{ item.song.album.name }}
          </div>
        </div>
        <!-- 右侧图标 -->
        <div class="dRightPic"><span class="rightPic"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
//引入swiper插件
import Swiper from "swiper";
export default {
  data() {
    return {
      /* 推荐歌单 */
      songlist: [],
      /* 最新歌曲 */
      song: [],
      /* 轮播图 */
      bannerList:[]
    };
  },
  mounted() {
    //组件已加载就获取推荐歌单
    this.getPersonList();
    this.getNewSong();
    //轮播图
    this.getBanner();
  },
  methods: {
    // 获取歌单
    getPersonList() {
      this.$axios
        .get("http://localhost:3000/personalized", {
          params: {
            limit: 6,
          },
        })
        .then((res) => {
          console.log(res, "响应");
          if (res.status === 200) {
            this.songlist = res.data.result;
          }
        });
    },
    /* 获取最新音乐 */
    getNewSong() {
      this.$axios
        .get("http://localhost:3000/personalized/newsong", {
          params: {},
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.result,"最新音乐");
            this.song = res.data.result;
          }
        });
    },
    // goList(){
    //   this.$router.push({
    //     path:'/list'
    //   })
    // },
    //轮播图跳转
    goStore(id){
      /* this.$router.push('/list?id='+id); */
      this.$router.push({
        path: "/store",
        query: {
          id,
        },
      });
    },
    // 重定向歌单id
    goList(id) {
      /* this.$router.push('/list?id='+id); */
      this.$router.push({
        path: "/list",
        query: {
          id,
        },
      });
    },
        //封装一个播放事件
    goPlay(id) {
      this.$router.push({
        path: "/play",
        query: {
          id,
        },
      });
    },
    // 获取轮播图的方法
    getBanner(){
      this.$axios
      .get("http://localhost:3000/banner")
      .then(res=>{
        console.log(res.data.banners,"响应banner");
        if(res.data.code === 200) {
          // 调用数组操作的方法,过滤filter
this.bannerList = res.data.banners.filter((item, i) => i < 4);
          /* 下一次DOM再触发，延迟加载，先加载完全部数据，在加载轮播图 */
          this.$nextTick(() => {
            console.log("下一次DOM再触发，延迟加载");
            /* 引入轮播图逻辑 */
            var swiper = new Swiper(".swiper-container",{
              // autoplay:true //默认是3秒
              autoplay:{
                delay:2000 /* 切换时间 */
              },
              loop: true, /* 循环 */
              pagination: {
                /* 分页器 */
                el: ".swiper-pagination"
              }
            });
          });
        }
      })
      .catch((err)=>{
        console.log(err,"错误信息");
      })
    },
  },
};
</script>
<style  lang="less" scoped>
/* 整个推荐的（包含推荐二字标题）的大的div */
.recommend {
  padding-top: 20px;
}
/* 推荐 */
.title {
  position: relative;
  padding-left: 9px;
  margin-bottom: 14px;
  font-size: 17px;
  height: 20px;
  line-height: 20px;
}
/* 推荐的前面的红色的竖线 */
.title:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -9px;
  width: 2px;
  height: 16px;
  background-color: #d33a31;
}
/* 六个推荐歌单的整个div */
.musicblock {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 24px;
}
.imgView {
  position: relative;

  padding-left: 1px;
  padding-right: 1px;
  box-sizing: border-box;
}
.imgtitle {
  background: url("https://gitee.com/frunoob/blog-image/raw/master/image/20201216124430.png");
}
.imgtitle {
  position: absolute;
  right: 5px;
  top: 2px;
  z-index: 3;
  padding-left: 13px;
  color: #fff;
  font-size: 12px;
  background-position: 0;
  background-repeat: no-repeat;
  background-size: 11px 10px;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
}
.listtext {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 6px 2px 0 6px;
  min-height: 30px;
  line-height: 1.2;
  font-size: 13px;
}
.musicblock .songlist {
  width: 33.3%;
}
/* 推荐歌单的封面 */
.musicblock .songlist .image {
  width: 100%;
  margin: 0;
}

/* 最新音乐 */
.bottom {
  position: relative;
  padding-left: 9px;
  margin-bottom: 14px;
  font-size: 17px;
  height: 20px;
  line-height: 20px;
}
/* 最新音乐前面的红色的竖线 */
.bottom::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -9px;
  width: 2px;
  height: 16px;
  background-color: #d33a31;
}
/* 最新音乐的每首单曲 */
.songs {
  display: flex;
  position: relative;
  &::after {
    position: absolute;
    z-index: 2;
    content: "";
    top: 0;
    left: 0;
    pointer-events: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  }
}
/* 最新歌曲每首歌曲的左半部分的歌曲名和歌手名 */
.songs_shuiping {
  width: 87%;
  padding-left: 10px;
}
/* 最新音乐 的下面每首歌的歌名 */
.song_title {
  font-size: 17px;
  color: #333;
}
/* 最新音乐 的下面每首歌的歌手名称 */
.singer {
  font-size: 12px;
  color: #888888;
  display: flex;
}
.dRightPic {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
}
/* 右侧的播放按钮 */
.rightPic {
  background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
    no-repeat;
  background-size: 162px 97px;
}
.rightPic {
  width: 22px;
  height: 22px;
  background-position: -23px 0;
}
/* 歌曲前的SQ图片 */
.sqq {
  transform: translate(3px, 5px);
}
.sq {
  background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
    no-repeat;
  background-size: 166px 97px;
}
.sq {
  width: 12px;
  height: 8px;
  margin-right: 4px;
  font-size: 12px;
  color: rgba(136, 136, 136, 0);
}
/* 以下轮播图样式 */
    .swiper-container {
      padding-bottom: 17px;
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
/* 轮播图图片样式 */
.imgUrl {
  width: 100%;
  height: 180px;
}
/* 以上是轮播图样式 */
</style>
