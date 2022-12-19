<template>
  <div class="area">
    <div class="box">
      <div class="topbox">
        <div class="flex-row" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
          <div class="title">问答小屋</div>
          <img src="../src/assets/tips.png" class="img" style="margin-left: 242px;"/>
        </div>
        <div class="line"></div>
<!--        <div class="txt">总有一个人可以回答你的问题</div>-->
        <img src="../src/assets/1.jpg" class="photo"/>
        <div class="flex-row tip-txt">
          <div class="txt1">解决</div>
          <p class="num">{{total}}</p>
          <div class="txt1">个问题</div>
        </div>
      </div>
      <div class="bottombox flex-row">
        <div class="flex-column">
          <img src="../src/assets/ask.png" class="big-img"/>
          <span class="txt-a">我要提问</span>
        </div>
        <div class="flex-column">
          <img src="../src/assets/write.png" class="big-img pos-w"/>
          <span class="txt-w">我来回答</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      total:111111111
    }
}
}
</script>

<style>
.area{
  width: 800px;
  height: 800px;
  background: antiquewhite;
}
.box{
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
}
.topbox{
  width: 400px;
  height: 400px;
  background-color: rgb(235, 246, 253);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: auto;
}
.bottombox{
  width: 400px;
  height: 100px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: center;
}
.flex-row{
  display: flex;
  flex-direction: row;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.flex-column:hover{
  color: limegreen;
  opacity: 0.6;
}
.title{
  width: 80px;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 25px;
  font-weight: bolder;
  /*position: absolute;*/
}
.img{
  width: 22px;
  height: 22px;
  /*background-color: rgba(200, 233, 255,0.6);*/
  margin-top: 21px;
  /*z-index: -1;*/
  /*position: absolute;*/
}
.big-img{
  width: 32px;
  height: 32px;
  /*background-color: rgba(200, 233, 255,0.6);*/
  margin-top: 21px;
}
.photo{
  width: 360px;
  height: 240px;
  margin-left: 20px;
  margin-top: 10px;
}
.line{
  width: 340px;
  border-top: #cccccc 2px solid;
  /*background-color: rgba(200, 233, 255,0.6);*/
  margin-top: 20px;
  margin-left: 25px;
}
.tip-txt{
  width: 400px;
  text-align: center;
  justify-content: center
  /*width:350px;*/
  /*font-size: 25px;*/
  /*margin-top: 10px;*/
  /*margin-left: 25px;*/
  /*color: #3bb06c;*/
  /*font-weight: bolder;*/
  /*z-index: -1;*/
  /*position: absolute;*/
}
.txt1{
  font-size: 25px;
  margin-top: 10px;
  /*z-index: -1;*/
  /*position: absolute;*/
}
.num{
  margin-left: 0;
  margin-right: 0;
  margin-top: 2px;
  font-size: 36px;
  color: coral;
}
.pos-w{
margin-left: 170px;
}
.txt-w{
  margin-left: 156px;
  margin-top: 10px;
}
.txt-a{
  margin-left: -16px;
  margin-top: 10px;
}
</style>
