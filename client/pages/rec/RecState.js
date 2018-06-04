
var RecStates = {
  Invalid : {
    id: 0,
    name: "待上传多媒体",
    desc: "案件正在上报中、或管理员置为无效等"
  },
  Reported: {
    id: 1,
    name: "待处理",
    desc: "案件等待处理中"
  },
  Reported_Handled: {
    id: 3,
    name: "受理中",
    desc: "案件已受理,但还未转到城管案件处理"
  },
  Processing: {
    id: 2,
    name: "处理中",
    desc: "转为城管案件进行处理"
  },
  Processed: {
    id: 9,
    name: "已处理",
    desc: "案件已结"
  },
  Ignore: {
    id: 10,
    name: "不受理",
    desc: "非法或不正常的上报，不予处理"
  },
  Checked: {
    id: 5,
    name: "已核查",
    desc: "案件已核查"
  },
  Checked_Synced: {
    id: 8,
    name: "已同步",
    desc: "核查已同步"
  },
  Checked_Finish: {
    id: 4,
    name: "已结案",
    desc: "核查已结案"
  }
};

module.exports = RecStates;