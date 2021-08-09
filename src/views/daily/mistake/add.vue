<template>
  <mistake-component :is-edit="false"/>
</template>

<script>
  import MistakeComponent from './components/MistakeComponent'

  export default {
    name: "AddMistake",
    components: {MistakeComponent}
  }
</script>
