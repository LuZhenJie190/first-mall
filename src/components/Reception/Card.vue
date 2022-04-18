<template>
  <div class="card">
    <div class="top">
      <slot name="image"></slot>
    </div>
    <div class="bottom">
      <slot name="title"></slot>
      <!-- <h3>小米12PRO白色12G+128G</h3> -->
      <slot name="subtitle"></slot>
      <slot name="price"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style scoped>
.card {
  width: 230px;
  height: 260px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 10px;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  background: #fff;
  transition: 0.3s;
  padding: 20px 0;
}
.card:hover {
  box-shadow: 0px 10px 10px #ccc;
  transition: 0.5s;
  transform: translateY(-10px);
  transition-timing-function: cubic-bezier(0.2, 0.5, 0.5, 1);
}
.bottom {
  text-align: center;
}
.bottom h3 {
  padding: 0 10px;
  font-weight: 500;
  font-size: 16px;
}
.bottom p {
  color: #757575;
  margin: 3px 0px 10px 0px;
}
.images {
  width: 160px;
  height: 160px;
  object-fit: cover;
  overflow: hidden;
}
.price {
  font-size: 20px;
  color: #be0f2d;
}
</style>