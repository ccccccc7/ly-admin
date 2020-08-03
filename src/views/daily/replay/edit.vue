<template>
  <replay-component :is-edit="true"/>
</template>

<script>
  import ReplayComponent from './components/ReplayComponent'

  export default {
    name: "EditReplay",
    components: {ReplayComponent}
  }
</script>
