<template>
    <div>
        <div>
            <button @click='$router.go(-1)'>返回</button>
        </div>
        <h1>播放.vue</h1>
        <!-- 音乐播放器 -->
        <audio :src="songUrl"  autoplay controls></audio>
        <h1>歌手名称：{{singger}}</h1>
        <h1>歌曲名称：{{songName}}</h1>
        <div>
            {{lyric}}
        </div>
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
            songUrl:'', 
            lyric:'',//歌词的属性
            songName:'',
            singger:'',
            commentList:[]
        };
    },
    mounted() {
        //执行播放音乐的函数方法
        this.playMusic()
        //执行获取歌词接口
        this.getLyric()
        //执行歌曲详情响应
        this.getDetail()
        this.getComment()
    },
    methods: {
        //封装一个播放音乐事件
        playMusic(){
            this.$axios.get('http://localhost:3000/song/url',{
                params:{
                    id:this.$route.query.id
                }
            })
            .then(res=>{
                console.log(res,'url地址接口');
                if(res.data.code===200){
                    this.songUrl = res.data.data[0].url
                }
            })
        },
        //封装一个获取歌词事件
        getLyric(){
            this.$axios.get('http://localhost:3000/lyric',{
                params:{
                    id:this.$route.query.id
                }
            })
            .then(res=>{
                console.log(res,'歌词响应');
                if(res.data.code===200){
                    this.lyric = res.data.lrc.lyric
                }
            })
        },
        //封装一个歌曲详情接口
        getDetail(){
                        this.$axios.get('http://localhost:3000/song/detail',{
                params:{
                    ids:this.$route.query.id
                }
            })
            .then(res=>{
                console.log(res,'歌曲详情的响应');
                if(res.data.code===200){
                    this.songName = res.data.songs[0].name
                    this.singger = res.data.songs[0].ar[0].name
                }
            })
        },
                //封装一个歌曲评论
        getComment(){
            this.$axios.get('http://localhost:3000/comment/music',{
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
.avatarUrl{
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
}
.comment{
    border: 2px solid #ccc;
}
</style>
