<template>
  <div>
    请求

    <div v-for="item in dateDemo" :key="item.id" class="news">
        {{ item.postId}}~{{item.name}}<br>
        {{item.body}}

    </div>

  </div>
</template>
<script>
// 单一页面导入axios
/* import axios from "axios"; */
export default {
  data() {
    return {
      dateDemo: [],
    };
  },
  mounted() {
      console.log("method");
      this.getNewsList();
  },
  methods: {
    //封装一个调取新闻接口的函数
    getNewsList() {
/*       axios
        .get("http://jsonplaceholder.typicode.com/comments",{
            params:{}
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.dateDemo = res.data;
            console.log("200");
          }
        })
        .catch((err) => {
            console.log(err);
        }); */

        this.$axios
        .get('http://jsonplaceholder.typicode.com/posts',{params:{}})
        .then((res)=>{
            if (res.status === 200) {
                this.dateDemo = res.data
            }
        })
        .catch((err)=>{
            console.log(err,"打印错误信息");
        })
    },
  },
};
</script>
<style lang="less" scoped>
</style>