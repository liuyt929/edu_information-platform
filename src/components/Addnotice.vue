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
        <div class="login">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <p>通知大标题:</p>
    <el-input v-model="hdr" placeholder="通知标题"></el-input>
    <p>通知详情:</p>
    <el-input type="textarea" :rows="10" placeholder="输入留言" maxlength="3999" v-model="cont"></el-input>
    <p><el-button type="primary" @click="Add">添加</el-button>
        <el-button type="info" @click="goBack()">返回</el-button></p>
    </el-col>
    </el-row> 
  </div>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
  </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Addnotice',
  data(){
    var Schoolinfo = JSON.parse(sessionStorage.getItem("Schoolinfo"));
    return {
        Schoolinfo:Schoolinfo,
        hdr:'',
        cont:'',

    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    Add(){
      if(this.hdr===""||this.cont==="")
      {
        this.$message({showClose: true,
        message: '信息不能为空！',
        type: 'error'});
        return;
      }
      var Nheader=this.hdr;
      var Ncontent=this.cont;
      var Sid=this.Schoolinfo.Sid;
      this.$http.post('/api/user/addNotice', {
          Nheader: Nheader,
          Ncontent: Ncontent,
          Sid:Sid
        },{}).then((response) => {
          this.$message({showClose: true,
        message: '添加成功！',
        type: 'success'});
          console.log(response);
        })
      this.$router.go('-1')
    }
  }
}
</script>

<style>
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