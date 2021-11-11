<template lang="pug">
div
    div {{$route.name ==="articleEdit"?'编辑文章':'新建文章'}}
    el-form(ref="form")
        el-form-item(label="文章标题")
            el-input(v-model="article.title",placeholder="TITLE")
        el-form-item(label="文章标签")
            el-select(v-model="article.tags",placeholder="TAG",multiple)
                el-option(v-for='item in tagList',:value="item.id",:label="item.name",:key="item.id")
        el-form-item(label="文章简介")
            el-input(v-model="article.summary",placeholder="SUMMARY",type="textarea")
        el-form-item(label="")
            //- quill-editor(:options="establishOption",v-model="article.content")
            mavon-editor(v-model="article.content",ref="mEditor")
        //- el-form-item(label="封面图片")
            el-upload(action="https://httpbin.org/post",drag,:on-success="upLoadSuccess")
                i.el-icon-upload
                div.el-upload__text 将文件拖到此处，或
                    em  点击上传
        el-form-item
            el-button(type="primary",@click="onSubmit") 保存
</template>
<script>
export default {
  data() {
    return {
      // 富文本编辑器配置
      establishOption: {
        placeholder: "请输入内容"
      },
      article: {
        title: "",
        tags: [],
        summary: "",
        content: "",
        // imgurl: ""
      },
      tagList: []
    };
  },
  methods: {
    onSubmit() {
      if (
        this.article.title.trim() === "" ||
        this.article.summary.trim() === "" ||
        this.article.content.trim() === "" 
        // this.article.tag.length === 0
      ) {
        return this.$message.error("请填写完整！");
      }
      // this.article.code = localStorage.code

      
      const data = this.article
      // data.content = this.$refs.mEditor.d_render // 不传标签，
      this.$http.createArticle(data).then(res=>{
        console.log(res.data, 'res')
        if (res.data.code === 0) {
          this.$message.success('操作成功！');
          this.$router.push(`/article/list`);
        }
      }).catch(error=>{
          console.log(error)
      })
    },
    upLoadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    updateData(value) {
      console.log(value);
    },
  async query() {
    await  this.$http
        .getTagList()
        .then(res => {
          console.log(res.data, 'res.data')
          this.tagList = res.data.data;
        })
        .catch(error => {
          this.$message.error(error.errorText);
        });
        if(this.$route.name!== "articleEdit"){
          return
        }
        this.$http.getArticle(this.$route.params.id).then(res=>{
          this.article = res.data.data;
          this.article.tags = res.data.data.tags.map((tag) => tag.id);
        })
    }
  },
  created() {
    this.query();
  }
};
</script>
<style lang="stylus" scoped>
>>>.el-select
  width 100%
  .el-select__tags
    max-width none !important
>>>.ql-editor
  height 400px
</style>
