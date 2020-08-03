<template>
  <replay-component :is-edit="false"/>
</template>

<script>
  import ReplayComponent from './components/ReplayComponent'

  export default {
    name: "AddReplay",
    components: {ReplayComponent}
  }
</script>
