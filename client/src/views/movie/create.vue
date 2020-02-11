<template>
  <div>
    <base-box type="danger" :title="title">
      <el-form ref="movie-form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="电影名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入电影名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电影分类" prop="genre">
              <el-input v-model="form.genre" placeholder="请输入电影分类"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电影导演" prop="director">
              <el-input v-model="form.director" placeholder="请输入电影导演"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电影年份" prop="year">
              <el-input type="number" v-model="form.year" placeholder="请输入发行年份"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电影海报" prop="poster">
              <el-input v-model="form.poster" placeholder="请输入电影海报"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电影评分" prop="rating">
              <el-input v-model="form.rating" placeholder="请输入电影评分"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="IMDB ID" prop="imdb_id">
              <el-input v-model="form.imdb_id" placeholder="请输入IMDB ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电影时长" prop="film_length">
              <el-input v-model="form.film_length" placeholder="请输入电影时长"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电影简介" prop="description">
              <el-input type="textarea" :rows="5" v-model="form.description" placeholder="请输入电影简介"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: center">
            <el-button
              type='primary'
              native-type="submit"
              :loading="loading"
              @click.prevent="submit('movie-form')">保存</el-button>
            <el-button
              type='warning'
              native-type="reset"
              @click.prevent="reset('movie-form')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </base-box>
  </div>
</template>

<script>
import MovieService from 'services/MovieService'

export default {
  data () {
    return {
      title: '新增电影',
      isEdit: false,
      loading: false,
      form: {
        name: '',
        year: '',
        director: '',
        rating: '',
        imdb_id: '',
        genre: '',
        poster: '',
        description: '',
        film_length: ''
      },
      rules: {
        name: { required: true, message: '请输入电影名称', trigger: 'blur' },
        year: { required: true, message: '请输入电影发行年份', trigger: 'blur' },
        director: { required: true, message: '请输入导演', trigger: 'blur' },
        rating: { required: true, message: '请输入电影评分', trigger: 'blur' },
        imdb_id: { required: true, message: '请输入电影IMDB ID', trigger: 'blur' },
        genre: { required: true, message: '请输入电影类型', trigger: 'blur' },
        poster: { required: true, message: '请输入电影海报', trigger: 'blur' },
        description: { required: true, message: '请输入电影描述', trigger: 'blur' },
        film_length: { required: true, message: '请输入电影时长', trigger: 'blur' }
      }
    }
  },
  async created () {
    if (this.$route.query.id) {
      this.isEdit = true
      this.title = '编辑电影'
      try {
        const response = await MovieService.getMovieById(this.$route.query.id)
        this.form = response.data.movie
      } catch (error) {
        this.$message.error('数据查询异常请稍后再试')
      }
    } else {
      this.isEdit = false
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            if (this.isEdit) {
              await MovieService.updateMovie(this.$route.query.id, this.form)
            } else {
              await MovieService.create(this.form)
            }
            this.$message({
              message: '信息保存成功！页面将在2s后跳转到信息列表页面',
              type: 'success',
              duration: 2000,
              onClose: () => {
                this.$router.push({ name: 'movie-list' })
              }
            })
          } catch (error) {
            if (typeof error.response.data !== 'undefined' && error.response.data.error) {
              this.$message.error(error.response.data.error)
            } else {
              this.$message.error(`[${error.response.status}],数据处理异常请稍后再试`)
            }
          } finally {
            this.loading = false
          }
        } else {
          this.loading = false
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style scoped>

</style>
