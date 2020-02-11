<template>
  <div>
    <base-box type="primary" title="电影列表">
      <template v-slot:title-addon>
        <div class="filter">
          <label class="active">最新</label>
          <label>高分</label>
          <label>动作</label>
          <label>剧情</label>
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
export default {
  data () {
    return {
      movies: []
    }
  },
  created () {
    // TODO: 调用接口获取数据
    this.movies = [
      {
        id: 1,
        name: '哪吒之魔童降世',
        poster: 'img/movie1.jpeg',
        rating: 8.6
      },
      {
        id: 2,
        name: '哪吒2',
        poster: 'img/movie1.jpeg',
        rating: 8.6
      }
    ]
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
