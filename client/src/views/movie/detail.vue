<template>
  <div>
    <base-box type="primary" title="电影详情">
      <template v-slot:title-addon>
        <div
          v-if="$store.state.isUserLogin"
          class="text-primary"
          style="margin-left: auto; cursor: pointer"
          @click="$router.push({path: '/movies/edit', query: { id: $route.params.id }})">
          <i class="el-icon-edit"></i>编辑电影
        </div>
      </template>
      <div class="movie-item">
        <h2>{{ movie.name }} <span class="text-info"> ( {{ movie.year }} )</span></h2>
        <img :src="movie.poster" :alt="movie.name" class="movie-poster">
        <ul class="movie-meta">
          <li><label class="text-info">导演：</label> {{ movie.director }} </li>
          <li><label class="text-info">类型：</label> {{ movie.genre }} </li>
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
import MovieService from 'services/MovieService'

export default {
  data () {
    return {
      movie: {}
    }
  },
  async created () {
    try {
      const response = await MovieService.getMovieById(this.$route.params.id)
      this.movie = response.data.movie
    } catch (error) {
      this.$message.error('数据查询异常请稍后再试')
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
