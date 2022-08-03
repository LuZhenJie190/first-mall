<template>
  <div class="loginform">
    <div class="loginfrom">
      <div class="login-left">
        <slot name="title"></slot>
        <div class="login-bg"></div>
      </div>
      <div class="login-right">
        <slot name="form"> </slot>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",

  data() {
    return {};
  },
};
</script>

<style scoped>
.loginfrom {
  width: 900px;
  height: 550px;
  background: #fff;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column: 10px;
  overflow: hidden;
  position: relative;
}

.login-left {
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  z-index: 10;
}

.login-right {
  display: flex;
}

.login-bg {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login_image.jpg");
  background-position: -732px -360px;
  background-repeat: no-repeat;
  object-fit: cover;
}

.btn-register:hover {
  opacity: 1;
  transition: 0.5s;
}

.btn-register:hover+.login-bg {
  transition: 0.5s;
  filter: blur(3px);
}

.btn-register {
  border: none;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 200px;
  padding: 20px;
  opacity: 0.7;
  transition: 0.5s;
  z-index: 20;
  cursor: pointer;
  position: absolute;
}

.btn-register a {
  font-weight: 600;
  font-size: 25px;
  color: #000;
}

.btn-register i {
  background: #be0f2d;
  border-radius: 100%;
  color: #fff;
  margin-top: 30px;
  transform: scale(2, 2);
}
</style>