<template>
  <div>
    <base-box type="primary" title="电影列表">
      <template v-slot:title-addon>
        <div class="filter">
          <label @click="orderBy('updatedAt')" :class="{active:0==current}">最新</label>
          <label @click="orderBy('rating')" :class="{active:1==current}">高分</label>
          <label @click="filterByGenre('喜剧')" :class="{active:2==current}">喜剧</label>
          <label @click="filterByGenre('剧情')" :class="{active:3==current}">剧情</label>
        </div>
        <div v-if="$store.state.isUserLogin" class="text-success" style="margin-left: auto; cursor: pointer" @click="$router.push({name: 'movie-create'})">
          <i class="el-icon-plus"></i>新增电影
        </div>
      </template>
      <div class="movie-list">
        <a
          class="movie-item"
          @click="$router.push({name: 'movie-detail', params: {id: movie.id}})"
          v-for="movie in movies"
          :key="movie.id">
          <img :src="movie.poster" :alt="movie.name">
          <p>{{ movie.name }}&nbsp;<strong>{{ movie.rating }}</strong></p>
        </a>
      </div>
    </base-box>
  </div>
</template>

<script>
import MovieService from 'services/MovieService'

export default {
  data () {
    return {
      current: 0,
      movies: []
    }
  },
  async created () {
    try {
      const response = await MovieService.getAll()
      // console.log(response)
      this.movies = response.data.movies
    } catch (error) {
      this.$message.error(`[${error.response.status}]，数据查询异常请稍后再试`)
    }
  },
  methods: {
    async orderBy (field) {
      if (field === 'updateAt') {
        this.current = 0
      } else if (field === 'rating') {
        this.current = 1
      }
      let query = `orderby=${field}`
      try {
        const response = await MovieService.getAll(query)
        this.movies = response.data.movies
      } catch (error) {
        this.$message.error(`[${error.response.status}]，数据查询异常请稍后再试`)
      }
    },
    async filterByGenre (field) {
      if (field === '喜剧') {
        this.current = 2
      } else if (field === '剧情') {
        this.current = 3
      }
      let query = `genre=${field}`
      try {
        const response = await MovieService.getAll(query)
        this.movies = response.data.movies
      } catch (error) {
        this.$message.error(`[${error.response.status}]，数据查询异常请稍后再试`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  margin-left: 10px;
  label {
    margin-right: 10px;
    color: #9b9b9b;
    font-size: 13px;
    cursor: pointer;
    &.active {
      color: #000;
    }
  }
}
.movie-list {
  .movie-item {
    display: block;
    margin: 10px;
    float: left;
    font-size: 13px;
    cursor: pointer;
    width: 114px;
  }
  img {
    height: 160px;
    width: 100%;
    object-fit: cover;
  }
  p {
    text-align: center;
    strong {
      color: #e09015;
    }
  }
}
</style>
