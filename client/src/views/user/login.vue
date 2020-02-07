<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      label-width="150px"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%" native-type="submit" @click="login">登录</el-button>
      <div class="login-info">如果没有账号请<router-link :to="{ name: 'register' }">点击注册</router-link></div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: {
          type: 'email',
          required: true,
          message: '请输入有效的邮箱地址',
          trigger: blur
        },
        password: { type: 'string', required: true, message: '密码不能为空', trigger: 'blur' }
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          // TODO: login api
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #2d3a4b;
    .login-form {
      position: relative;
      width: 430px;
      margin: 120px auto 0;
      background: white;
      padding: 20px;
      .login-info {
        text-align: right;
        font-size: 0.9rem;
        margin-top: 10px;
      }
    }
  }
</style>
