<template>
  <div>
    <div class="top">
      <div class="toptitle">
        <div class="regebang"></div>
        <div class="riqi">
          <p>更新日期：{{ updateTime }}</p>
        </div>
      </div>
      <div
        @click="goPlay(item.id)"
        v-for="(item, index) of song"
        :key="item.id"
        class="songs"
      >
        <!-- 数字 -->
        <div :class="{ active: index < 3 }" class="num">
          <span v-if="index < 9">0</span>{{ index + 1 }}
        </div>
        <!-- 左侧歌曲 -->
        <div class="songs_shuiping">
          <!-- 歌曲标题 -->
          <div class="song_title">{{ item.name }}</div>
          <!-- 歌手 -->
          <div class="singer">
            <div class="sqq"><span class="sq">00</span></div>
            <span v-for="(ar, idx) in item.ar" :key="ar.id">
              {{ idx > 0 ? "/" : "" }}{{ ar.name }}</span
            >-{{ item.al.name }}
          </div>
        </div>
        <!-- 右侧图标 -->
        <div class="dRightPic"><span class="rightPic"></span></div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取热歌对象
    this.getHotList();
  },
  methods: {
    //封装一个时间函数转化
    formateTime(timer) {
      //获取东八区的时间
      //new Date() 时间构造函数
      var date = new Date(timer);
      //Thu Dec 17 2020 08:06:10 GMT+0800 (中国标准时间) 东八区标准时间
      //年份
      var year = date.getFullYear();
      //获取月份 月份在获取的时候要+1
      //字符串补位 es7中的方法。padStart(),在字符串的前面补位。padEnd(),在字符串的末尾补位
      // var a = '10'
      // console.log(a.padEnd(4,'x'),'字符串啊啊啊啊')
      var month = (date.getMonth() + 1 + "").padStart(2, "0");
      //日
      var day = (date.getDate() + "").padStart(2, "0");
      //小时
      var hours = (date.getHours() + "").padStart(2, "0");
      //分钟
      var minutes = (date.getMinutes() + "").padStart(2, "0");
      //秒
      var seconds = (date.getSeconds() + "").padStart(2, "0");
      console.log(seconds, "当前时间");
      //return `1+2+3+${seconds}`
      return `${month}月${day}日`;
    },
    getHotList() {
      this.$axios
        .get("http://localhost:3000/playlist/detail", {
          params: {
            id: 3778678,
          },
        })
        .then((res) => {
          console.log(res.data.playlist.tracks, "热歌榜");
          if (res.data.code === 200) {
            this.song = res.data.playlist.tracks.filter((item, i) => i < 20);
            this.updateTime = this.formateTime(res.data.playlist.updateTime);
          }
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
  },
  data() {
    return {
      song: [],
      updateTime: "",
    };
  },
};
</script>

<style  lang="less" scoped>
.top {
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=")
    no-repeat;
  background-size: contain;
}
.regebang {
  position: absolute;
  left: 30px;
  right: 0;
  top: 24px;
  bottom: 0;
  background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
  background-size: 166px 97px;
}
.regebang {
  width: 142px;
  height: 67px;
  background-position: -24px -30px;
}
.riqi {
  position: absolute;
  top: 98px;
  left: 35px;
  font-size: 13px;
  color: white;
}
/* 最新音乐的每首单曲 */
.songs {
  display: flex;
}
.num {
  width: 10%;
  color: #000000;
  text-align: center;
  transform: translateY(20%);
}

/* 最新歌曲每首歌曲的左半部分的歌曲名和歌手名 */
.songs_shuiping {
  padding: 6px 0;
  width: 80%;
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
/* 最新音乐 的下面每首歌的歌名 */
.song_title {
  font-size: 17px;
  color: black;
}
/* 最新音乐 的下面每首歌的歌手名称 */
.singer {
  font-size: 12px;
  color: #888888;
  display: flex;
}
.dRightPic {
  padding-top: 6px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
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
/* 序号边红色 */
.active {
  color: red;
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
</style>
