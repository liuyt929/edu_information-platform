<template>
  <div class="d-flex flex-column justify-content-center w-100 h-100">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="homeapp">
        <div class="inhomeapp">
  <el-container id="Schoolclass">
    <!--页头-->
    <el-header>
      <el-page-header @back="goBack()" content="学校主页">
      </el-page-header>
    </el-header>
    <!--主体部分-->
    <el-main>
      <h1 class="schoolname">{{ Schoolinfo.Xxmc }}</h1>
      <!--评分展示-->
      <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}">
      </el-rate>
      <!--学校简介-->
      
      <div class="basicinfo">
        <h3>基本信息</h3>
        <div class="basicinfo-item">
            学校名称:{{ Schoolinfo.Xxmc }}
       </div>
       <div class="basicinfo-item">
            学校标识码:
          {{ Schoolinfo.Xxbsm }}
        </div>
          <div class="basicinfo-item">
            主管部门:
          {{ Schoolinfo.Zgbm }}
          </div>
          <div class="basicinfo-item">
            所在地:
          
          {{ Schoolinfo.Szd }}
        </div>
          <div class="basicinfo-item">
            办学层次:
          <el-tag size="small" :type="Schoolinfo.Bxcc === '本科' ? 'primary' : 'success'"
            disable-transitions>{{ Schoolinfo.Bxcc }}</el-tag>
          </div>
         <div class="basicinfo-item">
            备注:
        {{Schoolinfo.Bz}} 
        </div>
        <div class="tianjiatongzhi"> &nbsp</div>
        <button class="custom-btn btn-6" v-if='isManager' @click="Addnotice">添加通知</button><!--todo-->

      </div>
      
      <div class="tongzhi">
        <!--学校通知-->
      <h3>学校通知</h3>
      <el-table :data="notices" style="width: 100%" height='400px' :default-sort="{ prop: 'date', order: 'descending' }">
        <el-table-column prop="Nid" label="编号" sortable width="80">
        </el-table-column>
        <el-table-column label="日期" sortable width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.Ntime.replace(/T/g,' ').replace(/Z/g,'').slice(0,-4)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Nheader" label="标题" sortable>
        </el-table-column>
        <el-table-column label="详情" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看通知</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if='isManager' label="删除通知" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
       <div class="liuyanban">
        <!--留言板-->
       <h3>留言板</h3>
      <el-card class="el-card-d" shadow="always">
             <div class="infinite-list-wrapper" style="overflow:auto;">
                <el-timeline
                  infinite-scroll-disabled="disabled">
                <div v-if="comments.length>0"> 
                  <el-timeline-item v-for="(item,index) in comments"  
                  :key="index" :timestamp="item.Ctime.replace(/T/g,' ').replace(/Z/g,'').slice(0,-4)" placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>{{item.Uname}}:</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.Ccontent}}</p>
                    </el-card>
                  </el-timeline-item>
                </div>
                <div v-else>
                   <el-timeline-item placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>小助手：</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SaySomething!</p>
                    </el-card>
                  </el-timeline-item>
                </div>
              </el-timeline> 
              </div>
              <div v-if='notManager' class="el-card-messages">
                <br>
                读过这个学校？留个言吧~
                 <el-input type="textarea" :rows="5" placeholder="输入留言" maxlength="200" v-model="newcomment"></el-input>
                 <el-button type="info" round class="submit-message" @click="submitMessage">留言</el-button>
              </div>
            </el-card>
          </div>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
  </div>
  </div>
</div>
  </div>
</template>
    
<script>

export default {
  name: 'School',
  data() {
    var Schoolinfo = JSON.parse(sessionStorage.getItem("Schoolinfo"));
    var user = JSON.parse(sessionStorage.getItem("user"));
    var ismanager=sessionStorage.getItem('ismanager')
    var ism=0;
    if(ismanager=='1001')
        ism=true;
    return {
      notManager:!ism,
      isManager:ism,
      user:user,
      comments:[],
      newcomment:'',
      Schoolinfo: Schoolinfo,
      value: 3.7,
      size: 'medium',
      starvalue: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      notices: []
    }
  },
  mounted(){
    this.getComments();
    this.getNotices();
  },
  methods: {
    Addnotice(){
      this.$router.push('/addnotice');
    },
    goBack() {
      this.$router.go(-1)//todo
    },
    handleEdit(index, row) {
      console.log(index, row);
      var Nid=row.Nid;
      var notice;
      this.$http.post('/api/user/getoneNotice',{
        Nid:Nid
      },{}).then((response) => {
          notice=response.body[0];
          let notistr=JSON.stringify(notice);
          sessionStorage.setItem("Notice",[notistr]);//存储下来
          this.$router.push('/noti');
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      var Nid=row.Nid;
      this.$http.post('/api/user/deleteNotice',{
        Nid:Nid
      },{}).then((response) => {
        this.$message({ showClose: true, message: "已删除该通知~", type: 'success' });
        this.getNotices();
      })
    },
    submitMessage(){
      if(this.newcomment=='' || this.newcomment.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$message('写点啥提交也行呀😉');
          return;
      }
      var Sid=this.Schoolinfo.Sid;
      var Ccontent=this.newcomment;
      var Uid=this.user.Uid;
      var Uname=this.user.Uname;
      this.$http.post('/api/user/addComment', {
        Sid:Sid,
        Uid:Uid,
        Uname:Uname,
        Ccontent:Ccontent,
        LikeCount:0
      }, {}).then((response) => {
        this.$message({ showClose: true, message: "留言成功！", type: 'success' });
        this.newcomment='';
        this.getComments();
      })
    },
    getNotices(){
      var Sid=this.Schoolinfo.Sid;
      this.$http.post('/api/user/getNotices',{
        Sid:Sid
      },{}).then((response) => {
        if (response.body.length === 0) {
          
        }
        else{
          this.notices=response.body;
        }
      })
      this.notices.Ntime=this.notices.Ntime.slice(0,10);
    },  
    getComments(){
      var Sid=this.Schoolinfo.Sid;
      this.$http.post('/api/user/getComments',{
        Sid:Sid
      },{}).then((response) => {
        if (response.body.length === 0) {
        }
        else{
          this.comments=response.body;
        }
      })
    }

  }
}
</script>
<style scoped>
.el-header,.el-footer {
  background: rgba(66, 66, 66, 0);
  color: black;
  line-height: 60px;
}

.el-main {
  background: rgba(66, 66, 66, 0);
  text-align: center;
  line-height: 100%;
}
.elbutton1 {
  position: absolute;
  left: 10%;
}

.infinite-list-wrapper{
      width: 100%;
      height: 500px;
    }
    .submit-message{
        width: 100%; 
        background: rgb(235, 245, 247);
        color: cadetblue;
        letter-spacing:20px;
    }
 @media screen and (max-width: 3000px) and (min-width: 767px) {
    .el-card-d{
      float: left;
      margin-top: 20px;
      margin-left: 10%; 
      width: 80%;
      height: 90%;
      border-radius: 10px;

      background-color: rgba(255,255,255,0.8);
    }

   }
  /*
  屏幕小于768px的
  */
  @media screen and (max-width:768px) and (min-width: 100px){  
     .el-card-d{
      background-color: rgba(255,255,255,0.8);
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
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
.schoolname{
  font-size:30px;
  color:rgb(252, 249, 251);
  text-shadow: 2px 2px pink;
  font-size:40px;
}
.basicinfo{
  background-color:rgba(65,65,65,0.25);
  border-radius: 20px;
  border-color:azure;
  min-width:200px;
  line-height:250%;
  position: absolute;
  top: 30%;
  right: 60%;
  bottom: 70%;
  left: 5%;
  
}
.basicinfo-item{

  background-image: linear-gradient(315deg, rgba(118,174,241,0.5) 0%,rgba(246, 150, 188,0.5) 74%);

  font-size:20px;
  color:azure;
  padding:10px;
  font-weight: bolder;
}

.tongzhi{
  position: absolute;
  top: 30%;
  right: 5%;
  left: 50%;
  bottom:70%;
}
.liuyanban{
  position: absolute;
  top: 90%;
  right: 5%;
  left: 5%;
}

.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
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
  color:white;
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
.el-card-m{
  font-size:20px;
  border-radius: 10px;
  text-align: left;
  background-image: linear-gradient(315deg, rgba(118,174,241,0.5) 0%,rgba(246, 150, 188,0.5) 74%);
}
 /deep/ .el-textarea__inner {
    margin: 10px;
    display: block;
    resize: vertical;
    padding: 10px 10px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 90%;
    height:100px;
    font-size: 20px;
    color: rgb(8, 8, 8);
  background-image: linear-gradient(315deg, rgba(246, 150, 188,0.5)  0%,rgba(118,174,241,0.5) 74%);
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    /* -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1); */
    /* transition: border-color .2s cubic-bezier(.645,.045,.355,1); */
}
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-image: linear-gradient(315deg, rgba(246, 150, 188,0.5)  0%,rgba(118,174,241,0.5) 74%);
  
  border-radius:10px;
  border-style:ridge;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
</style>
    