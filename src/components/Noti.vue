<template>
  <div class="d-flex flex-column justify-content-center w-100 h-100">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="homeapp">
        <div class="inhomeapp">
    <el-container>
      <el-header>
        <el-page-header @back="goBack()" content="通知详情">
        </el-page-header>
      </el-header>
      <el-main>
        <h1>{{notice.Nheader}}</h1>
        <h3>{{ notice.Ntime.replace(/T/g,' ').replace(/Z/g,'').slice(0,-4) }}</h3>
        <p>{{ notice.Ncontent }}</p>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
    </div>
    </div>
    </div>
    </div>
  </template>

<script scoped>
export default {
  name: 'Noti',
  data() {
    var notice = JSON.parse(sessionStorage.getItem("Notice"));
    return {
        notice:notice
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.el-header,
.el-footer {
  background: rgba(66, 66, 66, 0);
  color: black;
  line-height: 60px;
}

.el-main {
  background: rgba(66, 66, 66, 0);
  text-align: center;
  line-height: 120%;

}

.elbutton1 {
  position: absolute;
  left: 10%;
}
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb {
  background: #40a0ff49;
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #40a0ff;
}

</style>

