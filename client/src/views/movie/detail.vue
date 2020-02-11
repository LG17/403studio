<template>
  <div>
    <base-box type="primary" title="电影详情">
      <template v-slot:title-addon>
        <div v-if="$store.state.isUserLogin" class="text-primary" style="margin-left: auto; cursor: pointer" @click="$router.push({name: 'movie-create'})">
          <i class="el-icon-edit"></i>编辑电影
        </div>
      </template>
      <div class="movie-item">
        <h2>{{ movie.name }} <span class="text-info"> ( {{ movie.year }} )</span></h2>
        <img :src="movie.poster" :alt="movie.name" class="movie-poster">
        <ul class="movie-meta">
          <li><label class="text-info">导演：</label> {{ movie.director }} </li>
          <li><label class="text-info">类型：</label> {{ movie.gener }} </li>
          <li><label class="text-info">评分：</label>
            <el-rate
              style="display: inline-block"
              :value="movie.rating/2"
              disabled>
            </el-rate>
            <span style="color: #ff9900">评分{{ movie.rating }} </span>
          </li>
          <li><label class="text-info">IMDB：</label> {{ movie.imdb_id }} </li>
          <li><label class="text-info">时长：</label> {{ movie.film_length }} </li>
        </ul>
        <div class="movie-description">
          <h3 class="text-success">{{ movie.name }}的剧情简介</h3>
          <p>{{ movie.description }}</p>
        </div>
      </div>
    </base-box>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movie: null
    }
  },
  created () {
    // TODO: 接口接收数据
    this.movie = {
      id: 1,
      name: '哪吒之魔童降世',
      gener: '剧情/喜剧/奇幻',
      director: '饺子',
      year: '2019',
      poster: 'img/movie1.jpeg',
      rating: 8.6,
      imdb_id: 'djk',
      film_length: '123分钟',
      description: '魔童降世。。。'
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-item {
  padding: 0 10px;
  .movie-poster {
    width: 135px;
    height: 200px;
    float: left;
    object-fit: cover;
  }
  .movie-meta {
    list-style: none;
    margin-left: 120px;
    font-size: 14px;
    li {
      line-height: 1.5;
    }
  }
  .movie-description {
    clear: both;
    text-indent: 20px;
    line-height: 1.2;
    font-size: 14px;
    h3 {
      text-indent: 0;
      padding: 0;
      margin: 0;
      padding-top: 10px;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
