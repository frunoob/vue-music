<template>
  <div>
    <!-- 上端输入框 -->
    <div class="v-input">
      <div class="inputcover">
        <!-- 左侧的搜索放大镜小图标 -->
        <i class="svg"></i>
        <!-- 输入框 -->
        <input
          type="text"
          class="inputfield"
          placeholder="搜索歌曲、歌手、专辑"
          v-model="val"
          @keyup.enter="enter"
        />
        <!-- 底部固定的提示语句 -->
        <!--  <label class="hodler">搜索歌曲、歌手、专辑</label> -->
        <!-- 最右侧的小叉子图片 -->
        <i id="del" v-show="isShow" @click="del"></i>
      </div>
    </div>

    <!-- 下端的热门搜索 -->
    <div v-if="searchList.length == 0" class="hotsearch">
      <h3 class="remensousuo">热门搜索</h3>
      <ul class="list">
        <li
          @click="goSearch(item.first)"
          class="hotpoint item"
          v-for="item in song"
          :key="item.first"
        >
          <span class="link" href="">{{ item.first }}</span>
        </li>
      </ul>
    </div>

        <!-- 搜索结果 -->
    <div  v-if="searchList.length>0">
      <div class="songs" @click='goPlay(item.id)' v-for="item in searchList" :key='item.id'>
        <!-- 左侧歌曲 -->
        <div class="songs_shuiping">
          <!-- 歌曲标题 -->
          <div class="song_title">{{ item.name }}</div>
          <!-- 歌手 -->
          <div class="singer">
            <div class="sqq"><span class="sq">00</span></div>
           <span v-for="(ar) in item.artists" :key="ar.id"> {{ar.name }}</span>-{{ item.album.name }}
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
    // 自动加载热门搜索标签
    this.getSearchHot();
  },
    watch: {
    val(newVal, oldVal) {
      if (this.val == "") {
        this.isShow = false;
        //把搜索列表置空
        this.searchList=[]
      } else {
        this.isShow = true;
      }
    }
  },
  data() {
    return {
      image:
        "https://gitee.com/frunoob/blog-image/raw/master/image/20201218192230.svg",
      val: "",
      isShow: false,
      song: [] /* 热门搜索标签 */,
      searchList: [] /* 搜索结果 */,
    };
  },
  methods: {
    //回车事件
    enter() {
      console.log("进入按下回车事件");
      //条件判断，提取掉空值
      if (this.val === "") {
        return "";
      }
      this.goSearch(this.val);
    },
    // 删除按钮事件
        del() {
      this.val = "";
      this.searchList=[];
    },
    // 热门搜索
    getSearchHot() {
      this.$axios.get("http://localhost:3000/search/hot").then((res) => {
        console.log(res, "热门搜索标签");
        if (res.data.code === 200) {
          this.song = res.data.result.hots;
        }
      });
    },
    // 调取搜索事件
    goSearch(keywords) {
      this.val = keywords;
      //调取搜索接口
      this.$axios
        .get("http://localhost:3000/search", {
          params: {
            keywords,
          },
        })
        .then((res) => {
          console.log(res, "搜索结果的响应");
          if (res.data.code === 200) {
            this.searchList = res.data.result.songs;
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
};
</script>

<style  lang="less" scoped>
.v-input {
  position: relative;
  padding: 15px 10px;

  .inputcover {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
  }
  .svg {
    position: absolute;
    left: 0;
    top: 9px;
    margin: 0 8px;
    vertical-align: middle;
  }
  .svg {
    width: 13px;
    height: 13px;
    background-image: url("https://gitee.com/frunoob/blog-image/raw/master/image/20201216191115.svg");
  }
  .inputfield {
    width: 100%;
    height: 30px;
    line-height: 18px;
    font-size: 14px;
        background: none;
  border: none;
  outline: none;
  display: block;
  }
  .hodler {
    position: absolute;
    left: 30px;
    top: 5px;
    font-size: 14px;
    color: #c9c9c9;
    background: rgba(0, 0, 0, 0);
    pointer-events: none;
  }
  #del {

    background: url('https://gitee.com/frunoob/blog-image/raw/master/image/20201218192230.svg') no-repeat;
    position: absolute;
    right: -3px;
    top: 8px;
    width: 29px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background-size: 14px ;
  }
}
.hotsearch {
  padding: 15px 10px 0;
  .remensousuo {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }
  .list {
    margin: 10px 0 7px;
    display: block;
    list-style-type: disc;
  }
  .item {
    display: inline-block; /* 水平排列 */
    height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 14px;
    color: #333;
    font-size: 14px;
    line-height: 32px;
    list-style: none;
    border: #d3d4da solid 1px;
    border-radius: 23px;
  }
}
/* 最新音乐的每首单曲 */
.songs {
  display: flex;
padding-left: 6px;
}
.num {
  width: 10%;
  color: #000000;
  text-align: center;
  transform: translateY(20%);
}

.songs_shuiping {
    padding: 6px 30px 0 0;
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
