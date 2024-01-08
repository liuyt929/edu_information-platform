<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: radial-gradient(circle, rgba(247, 150, 192, 1) 0%, rgba(118, 174, 241, 1) 100%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

.homeapp {
  position: absolute;
  top: 5%;
  right: 5%;
  bottom: 5%;
  left: 5%;
  
  background: rgba(66, 66, 66, 0.26);
  border-radius: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 3%;
}
.inhomeapp{
  position:absolute;
  top:3%;
  bottom:3%;
  left:1%;
  right:1%;
  overflow-y:auto;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
