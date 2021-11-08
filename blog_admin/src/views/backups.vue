<template lang="pug">
    div 
        h1 同步工时页面
</template>
<script>
export default {
  data() {
    return {
      loading: null
    };
  },
  methods: {
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: "同步中...Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    query() {
      this.$http.getworkingHours().then(res => {
        console.log(res);
        this.id = res.data.data._id;
      });
    },
    synchronization() {
      this.$http.synchronizationWorkingHours().then(res => {
        console.log(res);
        const data = res.data.issues;
        const Month = [
          "2019-01",
          "2019-02",
          "2019-03",
          "2019-04",
          "2019-05",
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12"
        ];
        const dateArr = {
          January: [],
          February: [],
          March: [],
          April: [],
          May: [],
          June: [],
          July: [],
          August: [],
          September: [],
          October: [],
          November: [],
          December: []
        };
        let index = 0;
        for (const iterator of Object.keys(dateArr)) {
          const arr = [];

          for (let i = 0; i < new Date(2019, index + 1, 0).getDate(); i++) {
            arr.push(0);
          }
          const temporary = data.filter(value => {
            return value.fields.customfield_10300.indexOf(Month[index]) !== -1;
          });
          dateArr[iterator] = arr.map((item, idx) => {
            let idx1 = idx + 1;
            if (idx1 < 10) {
              idx1 = "0" + idx1;
            }
            item = temporary.filter(value => {
              return !!value.fields.customfield_10300.endsWith(idx1);
            });
            let num = 0;
            item.forEach(n => {
              num += n.fields.customfield_10101;
            });
            return num;
          });
          console.log(arr);
          dateArr[iterator].total = eval(dateArr[iterator].join("+"));
          index += 1;
        }
        dateArr.id = this.id;
        this.$http.pulSynchronizationWorkingHours(dateArr).then(res => {
          this.loading.close();
        });
      });
    }
  },
  created() {
    this.openFullScreen()
    this.synchronization();
  }
};
</script>
<style lang="stylus" scoped></style>