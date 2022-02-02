/* 歌词滚动 */
<template>
  <div class="lyricScroll">

  </div>
</template>

<script>
import Lyric from 'lyric-parser'
export default {
  name: 'lyricScroll',
  data() {
    return {
      lyric: null
    }
  },
  methods: {
    async getLyric() {
      let result = await this.$request("/lyric", {
        id: this.$store.state.musicId
      })
      this.lyric = result.data.lrc.lyric
      // console.log(this.lyric)
      // console.log(result)
      // console.log(result.data)
    },

    lyricHandle({ lineNum, txt }) {
    console.log(lineNum)
    if (!this.$refs.lyricLine) {
        return
    }
    this.currentLyricNum = lineNum
    if(lineNum > 10) {
        let lineEl = this.$refs.lyricLine[lineNum - 10]
        if (this.$refs.lyricList) {
            this.$nextTick(() => {
                this.$refs.lyricList.scrollToElement(lineEl, 1000)
            })
        }
    } else {
        if (this.$refs.lyricList) {
            this.$nextTick(() => {
                this.$refs.lyricList.scrollTo(0, 0, 1000)
            })
        }
    }
    this.playingLyric = txt;
   },
  },
  mounted() {
    this.$bus.$on('getLyric',() => {
      console.log('进入获取歌词')
      this.getLyric()
    })

     let lyric = new Lyric(this.lyric,this.lyricHandle)
    //  console.log(lyric)
  },
}

</script>
<style lang='less'>

</style>