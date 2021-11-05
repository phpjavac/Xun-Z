<template lang="pug">
div
    div 文章列表
    div
        el-table(:data="ArticleData")
            el-table-column(type="selection")
            el-table-column(v-for="item in table",:label="item.name",:prop="item.value",:key="item.value")
            el-table-column(label="操作")
                template(slot-scope="scope")
                    el-button(type="text",@click='showMsg(scope.row.id)')   预览
                    el-button(type="text",@click='edit(scope.row.id)')   编辑
                    el-button(type="text",@click='fun_delete(scope.row.id)')   删除
        el-pagination(:total="page.total",:page-size="pageData.pageSize",layout="prev, pager, next",@next-click="pageChange",@prev-click="pageChange")
    el-dialog(:visible.sync='articleVisible')
      mavon-editor(v-model="articleInfo",ref="mEditor",:editable='false')
</template>
<script>
export default {
  data() {
    return {
      page: { total: 0 },
      table: [
        { name: "标题", value: "title" },
        { name: "简介", value: "summary" },
        { name: "作者", value: "user" },
        { name: "创建时间", value: "createTime" },
        { name: "最近更新", value: "updateTime" }
      ],
      pageData: {
        page: 1,
        pageSize: 20
      },
      ArticleData: [],
      articleVisible: false, // modal
      articleInfo: '', // modal-data
    };
  },
  methods: {
    showMsg(id) {
      this.$http.getArticle(id).then(res => {
        const { content }  = res.data.data;
        this.articleInfo = content;
        this.articleVisible = true;
      })
    },
    edit(id) {
      console.log(id);
      this.$router.push(`/article/edit/${id}`);
    },
    fun_delete(id) {
      this.$http.deleteArticle(id).then(() => {
        this.$message.success("删除成功");
        
      });
    },
    pageChange(value) {
      this.pageData.page = value;
      this.query();
    },

    date(date) {
      const now = new Date(date);
      const yy = now.getFullYear(); //年
      const mm = now.getMonth() + 1; //月
      const dd = now.getDate(); //日
      const hh = now.getHours(); //时
      const ii = now.getMinutes(); //分
      const ss = now.getSeconds(); //秒
      let clock = yy + "-";
      if (mm < 10) clock += "0";
      clock += mm + "-";
      if (dd < 10) clock += "0";
      clock += dd + " ";
      if (hh < 10) clock += "0";
      clock += hh + ":";
      if (ii < 10) clock += "0";
      clock += ii + ":";
      if (ss < 10) clock += "0";
      clock += ss;
      return clock;
    },
    query() {
      this.$http.getArticleList(this.pageData).then(res => {
        console.log(res);
        this.page = res.data;
        this.ArticleData = res.data.data.list;
      });
    }
  },
  created() {
    this.query();
  }
};
</script>
