<template>
  <div>
    <div class="backgroundImg">
      <button class="button" @click="tohome">
        <span class="enter"> Enter  →</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods:{
    tohome(){
      this.$router.push({
        name: ''
      })
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
}
*{
  width: 100%;
  height: 100%;
  padding: 0 0;
  margin: 0 0;
}
.backgroundImg {
  background-image: url("../src/assets/background.png");
  width: 100%;
  height: 100%;
  background-size: 80% 100%;
  margin-left: 10%;
  background-repeat: no-repeat;
}
.button{
  position: absolute;
  left: 14.5%;
  top:80%;
  width: 200px;
  height: 60px;
  opacity: 1;
  border-radius: 100px;
  background: linear-gradient(270deg, #E54A46 1%, #E54A46 5%, #D64846 14%, #AD4245 33%, #6C3843 60%, #122B41 94%, #052941 98%);
}
.enter{
  font-family: Poppins-Bold;
  font-size: 28px;
  font-weight: bold;
  line-height: 50px;
  letter-spacing: 0px;
  color: #F8F1F1;
}
</style>
