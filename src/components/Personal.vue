<template>
  <div class="d-flex flex-column justify-content-center w-100 h-100">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="homeapp">
  <el-container>
    <el-header>
      <el-page-header @back="goBack()" content="个人主页">
      </el-page-header>

    </el-header>
    <el-main>
      <div class="basicinfo">
        <div class="basicinfo-item">
          用户信息：{{ user.Uname }}
        </div>

        <div class="basicinfo-item">
          手机号：158430888888
        </div>
        <div class="basicinfo-item">
          居住地：黄渡理工
        </div>
        <div class="basicinfo-item">
          个人签名：奥里给！
        </div>
        <div class="basicinfo-item">
          学校：同济大学
        </div>
      </div>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
  </div>
  </div>
  </div>
</template>

<script scoped>
export default {
  name: 'Personal',
  data() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    return {
      user:user
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

.basicinfo{
  background-color:rgba(65,65,65,0.25);
  border-radius: 20px;
  border-color:azure;
  min-width:200px;
  line-height:250%;
  position: relative;
  margin:auto;
  
}
.basicinfo-item{

  background-image: linear-gradient(315deg, rgba(118,174,241,0.5) 0%,rgba(246, 150, 188,0.5) 74%);

  font-size:20px;
  color:azure;
  padding:10px;
  font-weight: bolder;
}
</style>
