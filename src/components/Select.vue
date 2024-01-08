<template>
    <div class="d-flex flex-column justify-content-center w-100 h-100">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="homeapp">
        <div class="inhomeapp">
    <el-container>
        <el-header>
            <el-page-header @back="goBack()" content="筛选学校"></el-page-header>
        </el-header>
        <el-main>
          <div class="select">
            <el-input size="medium" suffix-icon="el-icon-search" v-model="search.Xxmc" placeholder="学校名称" ></el-input>
          <el-input size="medium" suffix-icon="el-icon-search" v-model="search.Xxbsm" placeholder="学校标识码" ></el-input>
          <el-input size="medium" suffix-icon="el-icon-search" v-model="search.Zgbm" placeholder="主管部门" ></el-input>
          <el-input size="medium" suffix-icon="el-icon-search" v-model="search.Szd" placeholder="所在地" ></el-input>
          <el-input size="medium" suffix-icon="el-icon-search" v-model="search.Bxcc" placeholder="办学层次" ></el-input>
     
        <!--
          
    -->
    <br>
    <br>
          <button class="custom-btn btn-8" @click="clearFilter">清除</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <button class="custom-btn btn-6" @click="myfilter">筛选</button>
        </div>
        <div class="selecttable">
          <el-table 
    ref="filterTable"
    :data="tableData"
    style="width: 600">
    <el-table-column
      prop="Sid"
      label="学校id"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="Xxbsm"
      label="学校标识码"
      sortable
      width="180"
      column-key="xxbsm"
    >
    </el-table-column>
    <el-table-column
      prop="Xxmc"
      label="学校名称"
      width="360">
    </el-table-column>
    <el-table-column
      prop="Zgbm"
      label="主管部门"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Szd"
      label="所在地"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Bxcc"
      label="办学层次"
      width="180"
      :filters="[{ text: '本科', value: '本科' }, { text: '专科', value: '专科' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.Bxcc === '本科' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.Bxcc}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="进入主页">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">进入主页</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
        </el-main>
    </el-container>
    </div>
    </div>
    </div>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          search:{
            Xxmc:'',
            Xxbsm:'',
            Zgbm:'',
            Szd:'',
            Bxcc:'',
            Bz:''
          },
          tableData: []
        }
      },
      methods:{
      goBack() {
       this.$router.go(-1)
      },
      filterTag(value, row) {
        return row.Bxcc === value;
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      handleEdit(row) {
      let schstr=JSON.stringify(row)
        sessionStorage.setItem("Schoolinfo",[schstr]);//存储下来
        this.$router.push('school')
      },
      myfilter(){
        var Xxmc=this.search.Xxmc;
        var Xxbsm=this.search.Xxbsm;
        var Zgbm=this.search.Zgbm;
        var Szd=this.search.Szd;
        var Bxcc=this.search.Bxcc;
        this.$http.post('/api/user/filterSchool', {
        Xxmc: Xxmc,
        Xxbsm:Xxbsm,
        Zgbm:Zgbm,
        Szd:Szd,
        Bxcc:Bxcc
      }, {}).then((response) => {
        if (response.body.length === 0) {
          this.$message({ showClose: true, message: "没有查询到哦~换一个搜索词吧！", type: 'error' });
        }
        else {
          this.$message({ showClose: true, message: "搜索成功了！都在这里哦~", type: 'success' });
          this.tableData=response.body;
        }
      })
        
      }
    }
    }
  </script>

  <style scoped>
.el-header,.el-footer{
  color:black;
  line-height:60px;
  background: rgba(66, 66, 66, 0);
}
.el-main{
  background: rgba(66, 66, 66, 0);
  text-align:center;
  line-height:120%;
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
/* 8 */
.btn-8 {
  background-color: #f0ecfc;
background-image: linear-gradient(315deg, rgba(118,174,241,1) 0%,rgb(246, 150, 188) 74%);
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-8 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-8:before,
.btn-8:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  background: #c797eb;
  /*box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);*/
  transition: all 0.3s ease;
}
.btn-8:before{
   height: 0%;
   width: 2px;
}
.btn-8:after {
  width: 0%;
  height: 2px;
}
.btn-8:hover:before {
  height: 100%;
}
.btn-8:hover:after {
  width: 100%;
}
.btn-8:hover{
  background: transparent;
}
.btn-8 span:hover{
  color: #c797eb;
}
.btn-8 span:before,
.btn-8 span:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  background: #c797eb;
  /*box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);*/
  transition: all 0.3s ease;
}
.btn-8 span:before {
  width: 2px;
  height: 0%;
}
.btn-8 span:after {
  height: 2px;
  width: 0%;
}
.btn-8 span:hover:before {
  height: 100%;
}
.btn-8 span:hover:after {
  width: 100%;
}
/* 7 */
.btn-7 {
background: linear-gradient(0deg, rgba(255,151,0,1) 0%, rgba(251,75,2,1) 100%);
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-7 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-7:before,
.btn-7:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  background: rgba(251,75,2,1);
  box-shadow:
   -7px -7px 20px 0px rgba(255,255,255,.9),
   -4px -4px 5px 0px rgba(255,255,255,.9),
   7px 7px 20px 0px rgba(0,0,0,.2),
   4px 4px 5px 0px rgba(0,0,0,.3);
  transition: all 0.3s ease;
}
.btn-7:before{
   height: 0%;
   width: 2px;
}
.btn-7:after {
  width: 0%;
  height: 2px;
}
.btn-7:hover{
  color: rgba(251,75,2,1);
  background: transparent;
}
.btn-7:hover:before {
  height: 100%;
}
.btn-7:hover:after {
  width: 100%;
}
.btn-7 span:before,
.btn-7 span:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  background: rgba(251,75,2,1);
  box-shadow:
   -7px -7px 20px 0px rgba(255,255,255,.9),
   -4px -4px 5px 0px rgba(255,255,255,.9),
   7px 7px 20px 0px rgba(0,0,0,.2),
   4px 4px 5px 0px rgba(0,0,0,.3);
  transition: all 0.3s ease;
}
.btn-7 span:before {
  width: 2px;
  height: 0%;
}
.btn-7 span:after {
  height: 2px;
  width: 0%;
}
.btn-7 span:hover:before {
  height: 100%;
}
.btn-7 span:hover:after {
  width: 100%;
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
.select {
  position: absolute;
  top: 5%;
  right: 20%;
  bottom: 50%;
  left: 20%;
  background: transparent;
  border-radius: 20px;
  padding: 3%;
  line-height: 40px;
}
.el-input /deep/ .el-input__inner {
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: hsl(300, 20%, 99%);
    text-shadow:2px 2px#c797eb;
    font-size:16px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.selecttable{
  position: absolute;
  top: 50%;
  right: 0%;
  bottom: 5%;
  left: 0%;
  background: transparent;
  border-radius: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 3%;
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