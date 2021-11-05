<template lang="pug">
div
    div 管理标签
    div.content
        div.tag-list
            ul
                el-tag(v-for='item in tagList',closable,:key="item._id",@close='close_tag(item._id)').tag    {{item.name}}
        div.add-tag
            el-input(v-model="addTag",placeholder="请输入标签")
            el-button(type="primary",@click='fun_addTag').add-button   添加标签
</template>
<script>
export default {
  data() {
    return {
      addTag: "",
      tagList: []
    };
  },
  methods: {
    close_tag(id) {
      this.$http
        .deleteTag(id)
        .then(res => {
          this.$message.success(res.data.message);
          this.tagList = res.data.list;
        })
        .catch(error => {
          this.$message.error(error.errorText);
        });
    },
    fun_addTag() {
      this.$http
        .addTag({ tagName: this.addTag })
        .then(res => {
          this.addTag = "";
          this.tagList = res.data.list;
          this.$message.success(res.data.message);
        })
        .catch(error => {
          this.$message.error(error.errorText);
        });
    },
    query() {
      this.$http
        .getTagList()
        .then(res => {
          console.log(res);
          this.tagList = res.data.list;
        })
        .catch(error => {
          console.log(error)
          this.$message.error(error.errorText);
        });
    }
  },
  created() {
    this.query();
  }
};
</script>
<style lang="stylus" scoped>
.content
  display grid
  grid-template-columns 60% 35%
  grid-column-gap 5%
  .tag-list
    .tag
      margin 5px
  .add-tag
    .add-button
      margin-top 12px
</style>
