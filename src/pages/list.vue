<template>
    <div>
        <h1>list.vue</h1>
        <h2>获取路由传递的query参数----{{$route.query.id}}</h2>
        <div>歌单名称：{{playlist.name}}</div>
        <div>
            歌单背景：
            <img class="coverImg" :src="playlist.coverImgUrl" alt="">
        </div>
        <div>
            作者头像：
            <img class="avatarUrl" :src="avatarUrl" alt="">
        </div>
        <p>
            昵称：{{nickname}}
        </p>
        <ul>
            <li @click='$router.push(`/play?id=${item.id}`)' v-for="item in songlist" :key="item.id">
                歌曲名称：{{item.name}}
            </li>
        </ul>
        <hr>
        <ul>
            <li class="comment" v-for="item in commentList" :key='item.commentId'>
                <p>评论者：
                    <img class="avatarUrl" :src="item.user.avatarUrl" alt="">
                    {{item.user.nickname}}
                </p>
                评论的内容：{{item.content}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            playlist:{},
            avatarUrl:'',
            nickname:'',
            songlist:[],
            commentList:[]
        };
    },
    mounted() {//生命周期函数之一。挂载。组件一加载就会触发这个函数
        //console.log(this.$route,'触发')
        //组件一加载获取歌单详情
        this.getPlayDetail()
        //调取歌单评论
        this.getComment()
    },
    methods: {
        //封装一个歌单详情
        getPlayDetail(){
            this.$axios.get('http://localhost:3000/playlist/detail',{
                params:{
                    id:this.$route.query.id
                }
            })
            .then(res=>{
                console.log(res,'歌单详情响应')
                if(res.data.code===200){
                    this.playlist = res.data.playlist
                    this.avatarUrl = res.data.playlist.creator.avatarUrl
                    this.nickname = res.data.playlist.creator.nickname
                    this.songlist = res.data.playlist.tracks
                }
            })
        },
        //封装一个歌单评论
        getComment(){
            this.$axios.get('http://localhost:3000/comment/playlist',{
                params:{
                    id:this.$route.query.id
                }
            })
            .then(res=>{
                console.log(res,'歌单评论')
                if(res.data.code===200){
                    this.commentList = res.data.comments
                }
            })
        }
    },
};
</script>

<style  lang="" scoped>
.coverImg{
    width: 2.52rem;
    height: 2.52rem;
}
.avatarUrl{
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
}
.comment{
    border: 2px solid #ccc;
}
</style>
