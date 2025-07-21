interface Question {
  id: number;
  text: string;
  emoji: string;
  dimension: string;
  dimensionDesc: string;
  category: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 1 | -1; // 1表示正向，-1表示反向
}

Page({
  data: {
    currentIndex: 0,
    totalQuestions: 16,
    selectedAnswer: 0,
    progressPercent: 0,
    answers: [] as number[],
    currentQuestion: {} as Question,
    questions: [
      {
        id: 1,
        text: "你的狗狗是否喜欢紧跟你，而不是在新环境中独自探索？",
        emoji: "🐕",
        dimension: "依赖性 vs 独立性",
        dimensionDesc: "评估狗狗对主人的依赖程度和独立探索能力",
        category: "EI",
        direction: 1
      },
      {
        id: 2,
        text: "你的狗狗在散步时是否总是走在你前面，主动探索周围？",
        emoji: "🚶‍♂️",
        dimension: "探索性 vs 谨慎性",
        dimensionDesc: "观察狗狗对新环境的探索欲望",
        category: "SN",
        direction: 1
      },
      {
        id: 3,
        text: "当有陌生人接近时，你的狗狗会主动上前还是退缩观望？",
        emoji: "👋",
        dimension: "社交性 vs 警惕性",
        dimensionDesc: "评估狗狗的社交倾向和警觉性",
        category: "EI",
        direction: 1
      },
      {
        id: 4,
        text: "你的狗狗是否更喜欢重复的日常活动，而不是尝试新游戏？",
        emoji: "🎮",
        dimension: "习惯性 vs 新奇性",
        dimensionDesc: "观察狗狗对新奇事物的接受度",
        category: "SN",
        direction: -1
      },
      {
        id: 5,
        text: "训练时，你的狗狗是否能快速服从指令？",
        emoji: "🎓",
        dimension: "服从性 vs 自主性",
        dimensionDesc: "评估狗狗的训练配合度",
        category: "TF",
        direction: 1
      },
      {
        id: 6,
        text: "你的狗狗在兴奋时是否很难冷静下来？",
        emoji: "⚡",
        dimension: "兴奋性 vs 沉稳性",
        dimensionDesc: "观察狗狗的情绪控制能力",
        category: "JP",
        direction: 1
      },
      {
        id: 7,
        text: "你的狗狗是否喜欢有规律的作息时间？",
        emoji: "⏰",
        dimension: "规律性 vs 随性",
        dimensionDesc: "评估狗狗对规律的需求",
        category: "JP",
        direction: 1
      },
      {
        id: 8,
        text: "面对新玩具时，你的狗狗会仔细观察还是直接上前玩耍？",
        emoji: "🧸",
        dimension: "谨慎性 vs 冲动性",
        dimensionDesc: "观察狗狗的行为决策模式",
        category: "SN",
        direction: -1
      },
      {
        id: 9,
        text: "你的狗狗是否经常寻求你的关注和互动？",
        emoji: "👁️",
        dimension: "关注需求 vs 独立性",
        dimensionDesc: "评估狗狗的社交需求",
        category: "EI",
        direction: 1
      },
      {
        id: 10,
        text: "当你不在家时，你的狗狗能否安静地休息？",
        emoji: "🏠",
        dimension: "分离适应 vs 依赖性",
        dimensionDesc: "观察狗狗的独处能力",
        category: "EI",
        direction: -1
      },
      {
        id: 11,
        text: "你的狗狗是否会主动安慰你情绪低落时？",
        emoji: "💕",
        dimension: "共情性 vs 理性",
        dimensionDesc: "评估狗狗的情感敏感度",
        category: "TF",
        direction: -1
      },
      {
        id: 12,
        text: "在多狗环境中，你的狗狗倾向于领导还是跟随？",
        emoji: "🐕‍🦺",
        dimension: "领导性 vs 跟随性",
        dimensionDesc: "观察狗狗的群体角色",
        category: "TF",
        direction: 1
      },
      {
        id: 13,
        text: "你的狗狗对突发的噪音反应是否很敏感？",
        emoji: "🔊",
        dimension: "敏感性 vs 稳定性",
        dimensionDesc: "评估狗狗的应激反应",
        category: "JP",
        direction: 1
      },
      {
        id: 14,
        text: "你的狗狗是否喜欢探索花园里的每一个角落？",
        emoji: "🌿",
        dimension: "探索欲 vs 安全感",
        dimensionDesc: "观察狗狗的好奇心程度",
        category: "SN",
        direction: 1
      },
      {
        id: 15,
        text: "训练新技能时，你的狗狗是否表现出耐心？",
        emoji: "🎯",
        dimension: "耐心 vs 急躁",
        dimensionDesc: "评估狗狗的学习态度",
        category: "JP",
        direction: -1
      },
      {
        id: 16,
        text: "你的狗狗是否更喜欢和你一起活动而不是独自玩耍？",
        emoji: "🤝",
        dimension: "合作性 vs 独立性",
        dimensionDesc: "最终评估狗狗的社交倾向",
        category: "EI",
        direction: 1
      }
    ] as Question[]
  },

  onLoad() {
    this.initQuestionnaire();
  },

  initQuestionnaire() {
    const answers = new Array(this.data.totalQuestions).fill(0);
    this.setData({
      answers,
      currentQuestion: this.data.questions[0],
      selectedAnswer: 0,
      progressPercent: Math.round((1 / this.data.totalQuestions) * 100)
    });
  },

  selectAnswer(e: any) {
    const value = e.currentTarget.dataset.value;
    const answers = [...this.data.answers];
    answers[this.data.currentIndex] = value;
    
    this.setData({
      selectedAnswer: value,
      answers
    });
  },

  nextQuestion() {
    if (!this.data.selectedAnswer) {
      wx.showToast({
        title: '请先选择答案',
        icon: 'none'
      });
      return;
    }

    const nextIndex = this.data.currentIndex + 1;
    
    if (nextIndex >= this.data.totalQuestions) {
      // 测试完成，跳转到品种输入页
      this.saveAnswersAndNavigate();
      return;
    }

    // 继续下一题
    this.setData({
      currentIndex: nextIndex,
      currentQuestion: this.data.questions[nextIndex],
      selectedAnswer: this.data.answers[nextIndex] || 0,
      progressPercent: Math.round(((nextIndex + 1) / this.data.totalQuestions) * 100)
    });
  },

  prevQuestion() {
    if (this.data.currentIndex <= 0) return;

    const prevIndex = this.data.currentIndex - 1;
    this.setData({
      currentIndex: prevIndex,
      currentQuestion: this.data.questions[prevIndex],
      selectedAnswer: this.data.answers[prevIndex] || 0,
      progressPercent: Math.round(((prevIndex + 1) / this.data.totalQuestions) * 100)
    });
  },

  saveAnswersAndNavigate() {
    // 保存答案到全局数据或缓存
    const app = getApp();
    app.globalData = app.globalData || {};
    app.globalData.testAnswers = this.data.answers;
    app.globalData.testQuestions = this.data.questions;

    // 跳转到品种输入页
    wx.navigateTo({
      url: '/pages/breed-input/breed-input'
    });
  },

  goBack() {
    if (this.data.currentIndex > 0) {
      this.prevQuestion();
    } else {
      wx.navigateBack();
    }
  }
}); 