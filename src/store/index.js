import { values } from 'core-js/fn/object'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 当前播放歌曲id
  musicId: "",
  // 所有歌曲id和序号
  musicIds: null,
  // 当前播放歌曲序号
  index: null,
  // 第一首听的歌
  firstMusic: null,
  // 播放状态
  isPlaying: false,
  // 实时播放时长
  currentTime: 0,
  // 单曲数据
  singleDate: null,
  // 搜索后数据
  searchResult: null,
}
const actions = {
  // 开启连播后改变序号
  changeIndex(context) {
    let count = context.state.index + 1;
    if (count > 19) {

      context.commit('changeIndex', 0)
      // this.index = 0;
    } else {
      context.commit('changeIndex', count)
    }
  },
  changeId(context) {
    let id = context.state.musicIds[context.state.index].id
    context.commit('changeId', id)
  },


}
const mutations = {
  // 添加歌单数据
  addMusciIds(state, value) {
    state.musicIds = value
  },
  // 添加歌单中的单曲
  addInfo(state, value) {
    // 获取双击后的歌曲id，序号和设置第一首歌的序号
    state.musicId = value.id
    state.index = value.index
    state.firstMusic = value.index
  },

  // 歌曲序号超过歌单数量，归零
  changeIndex(state, value) {
    state.index = value
  },

  // 改变当前播放歌曲id
  changeId(state, value) {
    state.musicId = value
  },

  // 播放上一首
  prepSong(state) {
    let count = state.index - 1
    if (count < 0) {
      state.index = 19
    } else {
      state.index = count
    }
    state.musicId = state.musicIds[state.index].id
  },
  // 播放下一首
  nextSong(state) {
    let count = state.index + 1
    console.log(count)
    if (count > 19) {
      state.index = 0
      console.log(state.index)
    } else {
      state.index = count
    }
    state.musicId = state.musicIds[state.index].id
  },
  // 修改播放状态
  changeIsPlaying(state, value) {
    state.isPlaying = value
    // console.log('播放状态'+state.isPlaying)
  },
  // 更新歌曲当前时间
  updateCurrentTime(state, currentTime) {
    state.currentTime = currentTime;
  },
  // 添加单曲的数据(没有歌单)
  addSingleDate(state, value) {
    state.singleDate = value
  },
  // 添加搜索后的数据
  addSearchResult(state, value) {
    state.searchResult = value
  }
}

const getters = {
  showName(state) {
    // 判断是否是单曲
    if (state.index == null) {
      // 如果单曲有数据就进入
      if(state.singleDate !== null) {
        return state.singleDate.name
      } else {
        return
      }
    }
    // 判断不是单曲，是歌单
    else if (state.index == null) {
      return
    } else {
      return state.musicIds[state.index].name
    }
  },
  showSinger(state) {
    // 判断是否是单曲
    if (state.index == null) {
      // 如果单曲有数据就进入
      if(state.singleDate !== null) {
        return state.singleDate.singer
      } else {
        return
      }
    }
    // 判断不是单曲，是歌单
    else if (state.index == null) {
      return
    } else {
      return state.musicIds[state.index].singer
    }
  },
  showPig() {
    // 判断是否是单曲
    if (state.index == null) {
      // 如果单曲有数据就进入
      if(state.singleDate !== null) {
        return state.singleDate.pigUrl
      } else {
        return
      }
    }
    // 判断不是单曲，是歌单
    else if (state.index == null) {
      return
    } else {
      return state.musicIds[state.index].pigUrl
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  // modules
})
