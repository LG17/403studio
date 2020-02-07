<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="click">el-buttom</el-button>
  </div>
</template>

<script>
import UserService from '../services/UserService'

export default {
  name: 'about',
  methods: {
    async click () {
      const msg = await UserService.getUserById()
      console.log(msg.user)
    }
  }
}
</script>
