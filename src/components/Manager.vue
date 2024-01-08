<template>
    <div class="login-register">
      <div class="contain">
        <div class="big-box" :class="{ active: isLogin }">
          <div class="big-contain" v-if="isLogin">
            <div class="btitle">管理员登录</div>
            <div class="bform">
              <input type="username" placeholder="用户名" v-model="form.username" />
              <input type="password" placeholder="密码" v-model="form.userpsw" />
              <input type="text" placeholder="学校id" v-model="Sid" />
            </div>
          <button class="custom-btn btn-6" @click="login"><span>登录</span></button>
            <el-link type="primary" @click="goto_user()">普通用户点这里哦~</el-link>
          </div>
          <div class="big-contain" v-else>
            <div class="btitle">创建账户</div>
            <div class="bform">
              <input type="text" placeholder="用户名" v-model="form.username" />
              <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
              <input type="text" placeholder="注册码" v-model="form.zcm" />
              <input type="text" placeholder="学校id" v-model="Sid" />
              <input type="password" placeholder="密码" v-model="form.userpsw" />
            </div>
          <button class="custom-btn btn-6" @click="register"><span>注册</span></button>
          </div>
        </div>
        <div class="small-box" :class="{ active: isLogin }">
          <div class="small-contain" v-if="isLogin">
            <div class="stitle">你好，朋友!</div>
            <p class="scontent">开始注册，和我们一起旅行</p>
            <button class="sbutton" @click="changeType">注册</button>
          </div>
          <div class="small-contain" v-else>
            <div class="stitle">欢迎回来!</div>
            <p class="scontent">与我们保持联系，请登录你的账户</p>
            <button class="sbutton" @click="changeType">登录</button>
          </div>
        </div>
      </div>
    </div>
      
  </template>
  
  <script>
  export default {
    name: "manager",
    data() {
      return {
        isLogin: true,
        passwordError: false,
        existed: false,
        Sid:'',
        form: {
          username: '',
          userpsw: '',
          zcm:''
        },
      };
    },
    methods: {
      goto_user(){
        this.$router.push('/')
      },
      changeType() {
        this.isLogin = !this.isLogin;
        this.form.username = "";
        this.form.userpsw = "";
        this.form.zcm="";
        this.Sid='';
      },
      login() {
        if (this.form.username === "" || this.Sid===""||this.form.userpsw === "") {
          this.$message({ showClose: true, message: "账号或密码不能为空！", type: 'error' });
          return;
        }
  
        var Mname = this.form.username;
        var Mpassword = this.form.userpsw;
        var Sid=this.Sid;
        //this.$message({showClose:true,message:username,type:'error'});
  
        this.$http.post('/api/user/queryManager', {
          Mname: Mname,
          Mpassword: Mpassword,
          Sid:Sid
        }, {}).then((response) => {
          if (response.body.length === 0) {
            this.$message({ showClose: true, message: "账号或密码或身份错误！", type: 'error' });
            return;
          }
          else {
            this.$message({ showClose: true, message: "登录成功！", type: 'success' });
            let userstr = JSON.stringify(response.body[0])
            sessionStorage.setItem("SchoolManager", [userstr]);//存储Manage
            this.$http.post('/api/user/searchSchool2', {
          Sid: Sid
        }, {}).then((response) => {
            let Schoolstr = JSON.stringify(response.body[0])
            sessionStorage.setItem("Schoolinfo", [Schoolstr]);//存储Manage
             //按照Sid搜索学校，得到Schoolinfo
             sessionStorage.setItem('ismanager','1001')
          this.$router.push('/School')
        })
        }})
          },
      register() {
        if (this.form.username === "" ||this.form.zcm===""|| this.form.userpsw === "") {
          this.$message({
            showClose: true,
            message: '信息不能为空！',
            type: 'error'
          });
          return;
        }
        else if(this.form.zcm!=="zhucema123"){
            this.$message({
            showClose: true,
            message: '注册码错误！！',
            type: 'error'
          });
          return;
        }
        var Mname = this.form.username;
        var Mpassword = this.form.userpsw;
        var Sid=this.Sid;
        this.$http.post('/api/user/addManager', {
          Mname: Mname,
          Mpassword: Mpassword,
          Sid:Sid
        }, {}).then((response) => {
            this.$message({ showClose: true, message: "登录成功！", type: 'success' });
            let userstr = JSON.stringify(response.body[0])
            sessionStorage.setItem("SchoolManager", [userstr]);//存储Manage
        })
        this.$http.post('/api/user/searchSchool2', {
          Sid: Sid
        }, {}).then((response) => {
            let Schoolstr = JSON.stringify(response.body[0])
            sessionStorage.setItem("Schoolinfo", [Schoolstr]);//存储Manage
             //按照Sid搜索学校，得到Schoolinfo
             sessionStorage.setItem('ismanager','1001')

          this.$router.push('/School')
          })
      }}}
  </script>
  <!--todo:
1.添加接口
2.加一个字段ismanager
3.完善一下小细节
4.界面设计-->
  
  <style scoped>
  .login-register {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-image: url("../assets/background.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .contain {
    width: 60%;
    height: 60%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
  }
  
  .big-box {
    width: 70%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 30%;
    transform: translateX(0%);
    transition: all 1s;
  }
  
  .big-contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .btitle {
    font-size: 1.5em;
    font-weight: bold;
    color: rgb(246, 150, 188);
  }
  
  .bform {
    width: 100%;
    height: 40%;
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  
  .bform .errTips {
    display: block;
    width: 50%;
    text-align: left;
    color: red;
    font-size: 0.7em;
    margin-left: 1em;
  }
  
  .bform input {
    width: 50%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-left: 2em;
    background-color: #f0f0f0;
  }
  
  .bbutton {
    width: 20%;
    height: 40px;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: rgb(246, 150, 188);
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
  }
  
  .small-box {
    width: 30%;
    height: 100%;
  background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0%);
    transition: all 1s;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  
  .small-contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .stitle {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
  }
  
  .scontent {
    font-size: 0.8em;
    color: #fff;
    text-align: center;
    padding: 2em 4em;
    line-height: 1.7em;
  }
  
  .sbutton {
    width: 60%;
    height: 40px;
    border-radius: 24px;
    border: 1px solid #fff;
    outline: none;
    background-color: transparent;
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
  }
  
  .big-box.active {
    left: 0;
    transition: all 0.5s;
  }
  
  .small-box.active {
    left: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    transform: translateX(-100%);
    transition: all 1s;
  }

  .custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 24px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
/* 6 */
.btn-6 {
  background: rgb(247,150,192);
background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-6 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-6:before,
.btn-6:after {
  position: absolute;
  content: "";
  height: 0%;
  width: 1px;
 box-shadow:
   -1px -1px 20px 0px rgba(255,255,255,1),
   -4px -4px 5px 0px rgba(255,255,255,1),
   7px 7px 20px 0px rgba(0,0,0,.4),
   4px 4px 5px 0px rgba(0,0,0,.3);
}
.btn-6:before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}
.btn-6:after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}
.btn-6:hover{
  background: transparent;
  color: #76aef1;
  box-shadow: none;
}
.btn-6:hover:before {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6:hover:after {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6 span:before,
.btn-6 span:after {
  position: absolute;
  content: "";
  box-shadow:
   -1px -1px 20px 0px rgba(255,255,255,1),
   -4px -4px 5px 0px rgba(255,255,255,1),
   7px 7px 20px 0px rgba(0,0,0,.4),
   4px 4px 5px 0px rgba(0,0,0,.3);
}
.btn-6 span:before {
  left: 0;
  top: 0;
  width: 0%;
  height: .5px;
  transition: all 500ms ease;
}
.btn-6 span:after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: .5px;
  transition: all 500ms ease;
}
.btn-6 span:hover:before {
  width: 100%;
}
.btn-6 span:hover:after {
  width: 100%;
}
  </style>